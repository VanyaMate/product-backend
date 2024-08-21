import { ICallsService } from '@/domain/services/calls/calls-service.interface';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { DomainCall } from 'product-types/dist/call/DomainCall';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';
import {
    prismaCallToDomain,
} from '@/domain/services/call/converters/prismaCallToDomain';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';


export class PrismaCallsService implements ICallsService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async getMyNotFinishedCalls (userId: string, cursor: string, limit: number = 10): Promise<DomainCall[]> {
        const args: Prisma.CallFindManyArgs<DefaultArgs> = {
            where  : {
                OR      : [
                    { toUserId: userId },
                    { fromUserId: userId },
                ],
                finished: false,
            },
            include: {
                toUser  : { include: prismaToDomainUserInclude },
                fromUser: { include: prismaToDomainUserInclude },
            },
            take   : limit,
        };

        if (cursor) {
            args.cursor = {
                id: cursor,
            };
        }

        const calls = await this._prisma.call.findMany({
            where  : {
                OR      : [
                    { toUserId: userId },
                    { fromUserId: userId },
                ],
                finished: false,
            },
            include: {
                toUser  : { include: prismaToDomainUserInclude },
                fromUser: { include: prismaToDomainUserInclude },
            },
            cursor : cursor ? {
                id: cursor,
            } : undefined,
            take   : limit,
        });

        return calls.map((call) => {
            if (call.fromUserId === userId) {
                return prismaCallToDomain(call, prismaUserToDomain(call.toUser), call.fromUserNotificationConnectionId);
            } else {
                return prismaCallToDomain(call, prismaUserToDomain(call.fromUser), call.toUserNotificationConnectionId);
            }
        });
    }

    async getMyAllCalls (userId: string, cursor: string, limit: number): Promise<DomainCall[]> {
        throw new Error('Method not implemented.');
    }

    async getMyFinishedCalls (userId: string, cursor: string, limit: number): Promise<DomainCall[]> {
        throw new Error('Method not implemented.');
    }

    async getMyCallsWithUser (userId: string, withUserId: string, cursor: string, limit: number): Promise<DomainCall[]> {
        throw new Error('Method not implemented.');
    }

}