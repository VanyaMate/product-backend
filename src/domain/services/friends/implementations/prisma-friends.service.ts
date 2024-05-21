import {
    IFriendsService,
} from '@/domain/services/friends/friends-service.interface';
import { Friend, PrismaClient } from '@prisma/client';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    userPrismaToDomain,
} from '@/domain/services/user/converters/userPrismaToDomain';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


export class PrismaFriendsService implements IFriendsService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async getFriendsOfUserByUserId (userId: string): Promise<DomainUser[]> {
        try {

        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendsService.name, 400, 'Cant get friends');
        }
        const friends = await this._prisma.friend.findMany({
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
        return friends.map(
            (friend) => friend.ToUser.id === userId
                        ? userPrismaToDomain(friend.FromUser)
                        : userPrismaToDomain(friend.ToUser),
        );
    }

    async getFriendRequestsSendByUserId (userId: string): Promise<DomainUser[]> {
        try {
            const friends = await this._prisma.friendRequest.findMany({
                where  : { fromUserId: userId },
                include: {
                    ToUser: true,
                },
            });
            return friends.map(({ ToUser }) => userPrismaToDomain(ToUser));
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendsService.name, 400, 'Cant get sent friend requests');
        }
    }

    async getFriendRequestsReceivedByUserId (userId: string): Promise<DomainUser[]> {
        try {
            const friends = await this._prisma.friendRequest.findMany({
                where  : { toUserId: userId },
                include: {
                    FromUser: true,
                },
            });
            return friends.map(({ FromUser }) => userPrismaToDomain(FromUser));
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendsService.name, 400, 'Cant get received friend requests');
        }
    }

    async getFriendRequestsByUserId (userId: string): Promise<[ DomainUser[], DomainUser[] ]> {
        try {
            const friends               = await this._prisma.friendRequest.findMany({
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
            const friendRequestSend     = [];
            const friendRequestReceived = [];

            friends.forEach((friend) => {
                if (friend.ToUser.id === userId) {
                    friendRequestReceived.push(userPrismaToDomain(friend.FromUser));
                } else {
                    friendRequestReceived.push(userPrismaToDomain(friend.ToUser));
                }
            });

            return [ friendRequestSend, friendRequestReceived ];
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendsService.name, 400, 'Cant get friend requests');
        }
    }

}