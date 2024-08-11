import {
    IFriendService,
} from '@/domain/services/friend/friend-service.interface';
import { Friend, FriendRequest, PrismaClient } from '@prisma/client';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';

import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';
import {
    DomainNotificationFriendRequestAcceptedData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestAcceptedData';
import {
    DomainNotificationFriendRequestData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestData';
import {
    DomainNotificationFriendDeletedData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendDeletedData';
import {
    DomainNotificationFriendRequestCanceledData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestCanceledData';


export class PrismaFriendService implements IFriendService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async accept (fromUserId: string, requestId: string): Promise<Array<[ Array<string>, DomainNotificationFriendRequestAcceptedData ]>> {
        try {
            const receivedFriendRequest = await this._prisma.friendRequest.findFirstOrThrow({
                where : { toUserId: fromUserId, id: requestId },
                select: {
                    toUser    : { include: prismaToDomainUserInclude },
                    fromUser  : { include: prismaToDomainUserInclude },
                    fromUserId: true,
                    toUserId  : true,
                    id        : true,
                },
            });

            await this._prisma.friend.create({
                data: {
                    fromUserId: receivedFriendRequest.fromUserId,
                    toUserId  : receivedFriendRequest.toUserId,
                },
            });
            await this._prisma.friendRequest.delete({
                where: { id: receivedFriendRequest.id },
            });

            return [
                [
                    [
                        receivedFriendRequest.toUserId,
                    ],
                    {
                        user     : prismaUserToDomain(receivedFriendRequest.fromUser),
                        requestId: requestId,
                    },
                ],
                [
                    [ receivedFriendRequest.fromUserId ],
                    {
                        user     : prismaUserToDomain(receivedFriendRequest.toUser),
                        requestId: requestId,
                    },
                ],
            ];
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant accept friend request');
        }
    }

    async add (fromUserId: string, toUserId: string): Promise<Array<[ Array<string>, DomainNotificationFriendRequestData ]>> {
        try {
            const [ isFriends, friendRequestCreated ]: [ Friend, FriendRequest ] = await this._prisma.$transaction([
                this._prisma.friend.findFirst({
                    where: {
                        OR: [
                            { fromUserId, toUserId },
                            { fromUserId: toUserId, toUserId: fromUserId },
                        ],
                    },
                }),
                this._prisma.friendRequest.findFirst({
                    where: {
                        OR: [
                            { fromUserId, toUserId },
                            { fromUserId: toUserId, toUserId: fromUserId },
                        ],
                    },
                }),
            ]);

            if (!isFriends && !friendRequestCreated) {
                const request = await this._prisma.friendRequest.create({
                    data   : {
                        fromUserId,
                        toUserId,
                    },
                    include: {
                        fromUser: { include: prismaToDomainUserInclude },
                        toUser  : { include: prismaToDomainUserInclude },
                    },
                });

                return [
                    [
                        [ fromUserId ],
                        {
                            user     : prismaUserToDomain(request.toUser),
                            requestId: request.id,
                            message  : '',
                        },
                    ],
                    [
                        [ toUserId ],
                        {
                            user     : prismaUserToDomain(request.fromUser),
                            requestId: request.id,
                            message  : '',
                        },
                    ],
                ];
            }

            throw 'Request already exists';
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant add to friend');
        }
    }

    async remove (fromUserId: string, removedUserId: string): Promise<Array<[ Array<string>, DomainNotificationFriendDeletedData ]>> {
        try {
            const deletedFriend = await this._prisma.friend.findFirstOrThrow({
                where : {
                    OR: [
                        { fromUserId, toUserId: removedUserId },
                        { fromUserId: removedUserId, toUserId: fromUserId },
                    ],
                },
                select: {
                    id      : true,
                    fromUser: { include: prismaToDomainUserInclude },
                    toUser  : { include: prismaToDomainUserInclude },
                },
            });
            await this._prisma.friend.deleteMany({
                where: {
                    id: deletedFriend.id,
                },
            });

            if (fromUserId === deletedFriend.toUser.id) {
                return [
                    [
                        [ deletedFriend.toUser.id ],
                        {
                            user: prismaUserToDomain(deletedFriend.fromUser),
                        },
                    ],
                    [
                        [ deletedFriend.fromUser.id ],
                        {
                            user: prismaUserToDomain(deletedFriend.toUser),
                        },
                    ],
                ];
            } else {
                return [
                    [
                        [ deletedFriend.fromUser.id ],
                        {
                            user: prismaUserToDomain(deletedFriend.toUser),
                        },
                    ],
                    [
                        [ deletedFriend.toUser.id ],
                        {
                            user: prismaUserToDomain(deletedFriend.fromUser),
                        },
                    ],
                ];
            }
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant remove friend');
        }
    }

    async cancel (fromUserId: string, requestId: string): Promise<Array<[ Array<string>, DomainNotificationFriendRequestCanceledData ]>> {
        try {
            const canceledRequest = await this._prisma.friendRequest.delete({
                where : {
                    id: requestId,
                    OR: [
                        { fromUserId },
                        { toUserId: fromUserId },
                    ],
                },
                select: {
                    fromUser: { include: prismaToDomainUserInclude },
                    toUser  : { include: prismaToDomainUserInclude },
                },
            });

            if (canceledRequest.fromUser.id === fromUserId) {
                return [
                    [
                        [ canceledRequest.fromUser.id ],
                        {
                            user     : prismaUserToDomain(canceledRequest.toUser),
                            requestId: requestId,
                        },
                    ],
                    [
                        [ canceledRequest.toUser.id ],
                        {
                            user     : prismaUserToDomain(canceledRequest.fromUser),
                            requestId: requestId,
                        },
                    ],
                ];
            } else {
                return [
                    [
                        [ canceledRequest.toUser.id ],
                        {
                            user     : prismaUserToDomain(canceledRequest.fromUser),
                            requestId: requestId,
                        },
                    ],
                    [
                        [ canceledRequest.fromUser.id ],
                        {
                            user     : prismaUserToDomain(canceledRequest.toUser),
                            requestId: requestId,
                        },
                    ],
                ];
            }
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant cancel friend request');
        }
    }
}