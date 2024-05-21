import {
    IFriendService,
} from '@/domain/services/friend/friend-service.interface';
import { Friend, FriendRequest, PrismaClient } from '@prisma/client';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


export class PrismaFriendService implements IFriendService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async accept (fromUserId: string, toUserId: string): Promise<boolean> {
        try {
            const receivedFriendRequest: FriendRequest = await this._prisma.friendRequest.findFirst({
                where: { toUserId: fromUserId, fromUserId: toUserId },
            });

            if (receivedFriendRequest) {
                await this._prisma.friend.create({
                    data: {
                        fromUserId: receivedFriendRequest.fromUserId,
                        toUserId  : receivedFriendRequest.toUserId,
                    },
                });
                await this._prisma.friendRequest.delete({
                    where: { id: receivedFriendRequest.id },
                });

                return true;
            }

            return false;
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant accept friend request');
        }
    }

    async add (fromUserId: string, toUserId: string): Promise<boolean> {
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
                await this._prisma.friendRequest.create({
                    data: { fromUserId, toUserId },
                });

                return true;
            }

            return false;
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant add to friend');
        }
    }

    async remove (fromUserId: string, toUserId: string): Promise<boolean> {
        try {
            await this._prisma.friend.deleteMany({
                where: {
                    OR: [
                        { fromUserId, toUserId },
                        { toUserId: fromUserId, fromUserId: toUserId },
                    ],
                },
            });
            return true;
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant remove friend');
        }
    }

    async cancel (fromUserId: string, toUserId: string): Promise<boolean> {
        try {
            await this._prisma.friendRequest.deleteMany({
                where: {
                    OR: [
                        { fromUserId, toUserId },
                        { toUserId: fromUserId, fromUserId: toUserId },
                    ],
                },
            });
            return true;
        } catch (e) {
            throw serviceErrorResponse(e, PrismaFriendService.name, 400, 'Cant cancel friend request');
        }
    }
}