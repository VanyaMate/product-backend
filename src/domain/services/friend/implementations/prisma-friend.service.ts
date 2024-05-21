import {
    IFriendService,
} from '@/domain/services/friend/friend-service.interface';
import { FriendRequest, PrismaClient } from '@prisma/client';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


export class PrismaFriendService implements IFriendService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async add (fromUserId: string, toUserId: string): Promise<boolean> {
        try {
            // check requests
            const friendRequest: FriendRequest = await this._prisma.friendRequest.findFirst({
                where: {
                    OR: [
                        { fromUserId: toUserId, toUserId: fromUserId },
                        { fromUserId, toUserId },
                    ],
                },
            });

            // if same request created
            if (friendRequest.fromUserId === fromUserId) {
                // return false
                return false;
            }

            // if !request
            if (!friendRequest) {
                // create request
                await this._prisma.friendRequest.create({
                    data: {
                        fromUserId,
                        toUserId,
                    },
                });
                return true;
            }
            // else
            else {
                // accept request
                // - create link
                await this._prisma.friend.create({
                    data: {
                        fromUserId: toUserId,
                        toUserId  : fromUserId,
                    },
                });
                // - delete request
                await this._prisma.friendRequest.delete({
                    where: { id: friendRequest.id },
                });
                return true;
            }
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