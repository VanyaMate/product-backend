import { ICallService } from '@/domain/services/call/call-service.interface';
import { DomainCallAnswer } from 'product-types/dist/call/DomainCallAnswer';
import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';
import {
    NotificationServiceResponse,
} from '../../notification/types/NotificationServiceResponse';
import { PrismaClient } from '@prisma/client';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';
import {
    prismaCallToDomain,
} from '@/domain/services/call/converters/prismaCallToDomain';


export class PrismaCallService implements ICallService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async offer (userId: string, callId: string, offer: DomainCallOffer, connectionId: string): Promise<NotificationServiceResponse[]> {
        // check if toUserId exist
        const call = await this._prisma.call.update({
            where  : {
                id                            : callId,
                toUserId                      : userId,
                toUserNotificationConnectionId: '',
                finished                      : false,
            },
            data   : {
                toUserNotificationConnectionId: connectionId,
            },
            include: {
                toUser  : { include: prismaToDomainUserInclude },
                fromUser: { include: prismaToDomainUserInclude },
            },
        });

        if (call) {
            const domainFromUser = prismaUserToDomain(call.fromUser);
            const domainUser     = prismaUserToDomain(call.toUser);

            return [
                [
                    [ userId ],
                    DomainNotificationType.CALL_OFFER_IN,
                    {
                        call: prismaCallToDomain(call, domainFromUser, connectionId),
                    },
                ],
                [
                    [ domainFromUser.id ],
                    DomainNotificationType.CALL_OFFER_OUT,
                    {
                        call: prismaCallToDomain(call, domainUser, call.fromUserNotificationConnectionId),
                        offer,
                    },
                ],
            ];
        }

        throw 'Call not exist';
    }

    async answer (userId: string, callId: string, answer: DomainCallAnswer): Promise<NotificationServiceResponse[]> {
        // check if toUserId exist
        const call = await this._prisma.call.findFirst({
            where  : {
                id      : callId,
                finished: false,
            },
            include: {
                toUser  : { include: prismaToDomainUserInclude },
                fromUser: { include: prismaToDomainUserInclude },
            },
        });

        if (call) {
            const domainUser   = prismaUserToDomain(call.fromUser);
            const domainToUser = prismaUserToDomain(call.toUser);

            return [
                [
                    [ userId ],
                    DomainNotificationType.CALL_ANSWER_IN,
                    {
                        call: prismaCallToDomain(call, domainToUser, call.fromUserNotificationConnectionId),
                    },
                ],
                [
                    [ call.toUser.id ],
                    DomainNotificationType.CALL_ANSWER_OUT,
                    {
                        call: prismaCallToDomain(call, domainUser, call.toUserNotificationConnectionId),
                        answer,
                    },
                ],
            ];
        }

        throw 'Call not exist';
    }

    async start (userId: string, toUserId: string, connectionId: string): Promise<NotificationServiceResponse[]> {
        const [ call, user, toUser ] = await this._prisma.$transaction([
            this._prisma.call.findFirst({
                where: {
                    OR      : [
                        { fromUserId: userId, toUserId: toUserId },
                        { toUserId: userId, fromUserId: toUserId },
                    ],
                    finished: false,
                },
            }),
            this._prisma.user.findFirst({
                where  : { id: userId },
                include: prismaToDomainUserInclude,
            }),
            this._prisma.user.findFirstOrThrow({
                where  : { id: toUserId },
                include: prismaToDomainUserInclude,
            }),
        ]);

        if (call) {
            throw 'Call exist';
        }

        if (user && toUser) {
            // TODO: Check permissions

            const call = await this._prisma.call.create({
                data: {
                    fromUserId                      : userId,
                    toUserId                        : toUserId,
                    fromUserNotificationConnectionId: connectionId,
                },
            });

            return [
                [
                    [ userId ],
                    DomainNotificationType.CALL_START_IN,
                    {
                        call: prismaCallToDomain(call, prismaUserToDomain(toUser), connectionId),
                    },
                ],
                [
                    [ toUserId ],
                    DomainNotificationType.CALL_START_OUT,
                    {
                        call: prismaCallToDomain(call, prismaUserToDomain(user), ''),
                    },
                ],
            ];
        }

        throw 'Users not exist';
    }

    async finish (userId: string, callId: string): Promise<NotificationServiceResponse[]> {
        // End / Cancel
        const call = await this._prisma.call.update({
            where  : {
                OR      : [
                    { fromUserId: userId },
                    { toUserId: userId },
                ],
                id      : callId,
                finished: false,
            },
            data   : {
                finished: true,
            },
            include: {
                toUser  : { include: prismaToDomainUserInclude },
                fromUser: { include: prismaToDomainUserInclude },
            },
        });

        if (call) {
            const domainUser   = prismaUserToDomain(call.fromUser);
            const domainToUser = prismaUserToDomain(call.toUser);

            return [
                [
                    [ userId ],
                    DomainNotificationType.CALL_FINISH_IN,
                    {
                        call: prismaCallToDomain(call, domainToUser, call.fromUserNotificationConnectionId),
                    },
                ],
                [
                    [ call.toUser.id ],
                    DomainNotificationType.CALL_FINISH_OUT,
                    {
                        call: prismaCallToDomain(call, domainUser, call.toUserNotificationConnectionId),
                    },
                ],
            ];
        }

        throw 'Call not exist';
    };
}