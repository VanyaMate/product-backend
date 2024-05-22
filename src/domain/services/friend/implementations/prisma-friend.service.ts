import {
    IFriendService,
} from '@/domain/services/friend/friend-service.interface';
import { Friend, FriendRequest, PrismaClient } from '@prisma/client';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import {
    DomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestAcceptedData';
import {
    DomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';
import {
    DomainNotificationFriendDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendDeletedData';
import {
    DomainNotificationFriendRequestCanceledData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestCanceledData';
import {
    prismaDomainUserSelector,
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';


export class PrismaFriendService implements IFriendService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async accept (fromUserId: string, requestId: string): Promise<[ string[], DomainNotificationFriendRequestAcceptedData ]> {
        try {
            const receivedFriendRequest = await this._prisma.friendRequest.delete({
                where : { fromUserId, id: requestId },
                select: {
                    ToUser    : {
                        select: prismaDomainUserSelector,
                    },
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
                [ receivedFriendRequest.fromUserId ],
                {
                    user: receivedFriendRequest.ToUser,
                },
            ];
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant accept friend request');
        }
    }

    async add (fromUserId: string, toUserId: string): Promise<[ string[], DomainNotificationFriendRequestData ]> {
        try {
            const isFriends: Friend = await this._prisma.friend.findFirst({
                where: {
                    OR: [
                        { fromUserId, toUserId },
                        { fromUserId: toUserId, toUserId: fromUserId },
                    ],
                },
            });

            if (!isFriends) {
                const request = await this._prisma.friendRequest.create({
                    data   : {
                        fromUserId,
                        toUserId,
                    },
                    include: {
                        FromUser: {
                            select: prismaDomainUserSelector,
                        },
                    },
                });

                return [
                    [ toUserId ],
                    {
                        user   : request.FromUser,
                        message: '',
                    },
                ];
            }

            throw 'Request already exists';
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant add to friend');
        }
    }

    async remove (fromUserId: string, removedUserId: string): Promise<[ string[], DomainNotificationFriendDeletedData ]> {
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
                    FromUser: { select: prismaDomainUserSelector },
                    ToUser  : { select: prismaDomainUserSelector },
                },
            });
            await this._prisma.friend.delete({
                where: {
                    id: deletedFriend.id,
                },
            });

            if (fromUserId === deletedFriend.ToUser.id) {
                return [
                    [ deletedFriend.FromUser.id ],
                    {
                        user: deletedFriend.ToUser,
                    },
                ];
            } else {
                return [
                    [ deletedFriend.ToUser.id ],
                    {
                        user: deletedFriend.FromUser,
                    },
                ];
            }
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant remove friend');
        }
    }

    async cancel (fromUserId: string, requestId: string): Promise<[ string[], DomainNotificationFriendRequestCanceledData ]> {
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
                    FromUser: { select: prismaDomainUserSelector },
                    ToUser  : { select: prismaDomainUserSelector },
                },
            });

            if (canceledRequest.FromUser.id === fromUserId) {
                return [ [], null ];
            } else {
                return [ [ canceledRequest.FromUser.id ], { user: canceledRequest.ToUser } ];
            }
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant cancel friend request');
        }
    }
}