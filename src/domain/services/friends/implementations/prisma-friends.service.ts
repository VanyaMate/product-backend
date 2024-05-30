import {
    IFriendsService,
} from '@/domain/services/friends/friends-service.interface';
import {
    Friend,
    FriendRequest,
    Prisma,
    PrismaClient,
    PrismaPromise,
} from '@prisma/client';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    userPrismaToDomain,
} from '@/domain/services/user/converters/userPrismaToDomain';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import {
    DomainFriendRequest,
} from 'product-types/dist/friends/DomainFriendRequest';
import { DomainFriends } from 'product-types/dist/friends/DomainFriends';


export class PrismaFriendsService implements IFriendsService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async getFriendsOfUserByUserId (userId: string): Promise<DomainUser[]> {
        try {
            const friends = await this._getFriendsByUserId(userId);
            return friends.map(
                (friend) => friend.ToUser.id === userId
                            ? userPrismaToDomain(friend.FromUser)
                            : userPrismaToDomain(friend.ToUser),
            );
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendsService.name, 400, 'Cant get friends');
        }
    }

    async getFriendRequestsSentByUserId (userId: string): Promise<DomainFriendRequest[]> {
        try {
            const friends = await this._getFriendRequestsSentByUserId(userId);
            return friends.map(({ ToUser, id, message }) => ({
                requestId: id,
                message  : message,
                user     : userPrismaToDomain(ToUser),
            }));
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendsService.name, 400, 'Cant get sent friend requests');
        }
    }

    async getFriendRequestsReceivedByUserId (userId: string): Promise<DomainFriendRequest[]> {
        try {
            const friends = await this._getFriendRequestsReceivedByUserId(userId);
            return friends.map(({ FromUser, id, message }) => ({
                requestId: id,
                message  : message,
                user     : userPrismaToDomain(FromUser),
            }));
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendsService.name, 400, 'Cant get received friend requests');
        }
    }

    async getFriendRequestsByUserId (userId: string): Promise<[ DomainFriendRequest[], DomainFriendRequest[] ]> {
        try {
            const friendRequests                                    = await this._getFriendRequestsByUserId(userId);
            const friendRequestSend: Array<DomainFriendRequest>     = [];
            const friendRequestReceived: Array<DomainFriendRequest> = [];

            friendRequests.forEach((request) => {
                if (request.ToUser.id === userId) {
                    friendRequestReceived.push({
                        requestId: request.id,
                        message  : request.message,
                        user     : userPrismaToDomain(request.FromUser),
                    });
                } else {
                    friendRequestReceived.push({
                        requestId: request.id,
                        message  : request.message,
                        user     : userPrismaToDomain(request.ToUser),
                    });
                }
            });

            return [ friendRequestSend, friendRequestReceived ];
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendsService.name, 400, 'Cant get friend requests');
        }
    }


    async getFriendsWithRequestsByUserId (userId: string): Promise<DomainFriends> {
        try {
            const [ currentFriends, requestIn, requestOut ] = await this._prisma.$transaction([
                this._getFriendsByUserId(userId),
                this._getFriendRequestsReceivedByUserId(userId),
                this._getFriendRequestsSentByUserId(userId),
            ]);

            return {
                friends    : currentFriends.map(
                    (friend) => friend.ToUser.id === userId
                                ? userPrismaToDomain(friend.FromUser)
                                : userPrismaToDomain(friend.ToUser),
                ),
                requestsIn : requestIn.map(({ FromUser, id, message }) => ({
                    requestId: id,
                    message  : message,
                    user     : userPrismaToDomain(FromUser),
                })),
                requestsOut: requestOut.map(({ ToUser, id, message }) => ({
                    requestId: id,
                    message  : message,
                    user     : userPrismaToDomain(ToUser),
                })),
            };
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendsService.name, 400, 'Cant get friend requests');
        }
    }

    private _getFriendsByUserId (userId: string) {
        return this._prisma.friend.findMany({
            where  : {
                OR: [
                    { fromUserId: userId },
                    { toUserId: userId },
                ],
            },
            include: {
                ToUser  : true,
                FromUser: true,
            },
        });
    }

    private _getFriendRequestsSentByUserId (userId: string) {
        return this._prisma.friendRequest.findMany({
            where  : { fromUserId: userId },
            include: {
                ToUser: true,
            },
        });
    }

    private _getFriendRequestsReceivedByUserId (userId: string) {
        return this._prisma.friendRequest.findMany({
            where  : { toUserId: userId },
            include: {
                FromUser: true,
            },
        });
    }

    private _getFriendRequestsByUserId (userId: string) {
        return this._prisma.friendRequest.findMany({
            where  : {
                OR: [
                    { fromUserId: userId },
                    { toUserId: userId },
                ],
            },
            include: {
                ToUser  : true,
                FromUser: true,
            },
        });
    }
}