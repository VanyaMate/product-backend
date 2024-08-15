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


export class PrismaCallService implements ICallService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async offer (userId: string, toUserId: string, offer: DomainCallOffer): Promise<NotificationServiceResponse[]> {
        // check if toUserId exist
        const [ user, toUser ] = await this._prisma.$transaction([
            this._prisma.user.findFirst({
                where  : { id: userId },
                include: prismaToDomainUserInclude,
            }),
            this._prisma.user.findFirstOrThrow({
                where  : { id: toUserId },
                include: prismaToDomainUserInclude,
            }),
        ]);

        if (user && toUser) {
            return [
                [
                    [ userId ],
                    DomainNotificationType.CALL_OFFER_IN,
                    {
                        user: prismaUserToDomain(toUser),
                        offer,
                    },
                ],
                [
                    [ toUserId ],
                    DomainNotificationType.CALL_OFFER_OUT,
                    {
                        user: prismaUserToDomain(user),
                        offer,
                    },
                ],
            ];
        }

        throw 'Users not exist';
    }

    async answer (userId: string, toUserId: string, answer: DomainCallAnswer): Promise<NotificationServiceResponse[]> {
        // check if toUserId exist
        const [ user, toUser ] = await this._prisma.$transaction([
            this._prisma.user.findFirst({
                where  : { id: userId },
                include: prismaToDomainUserInclude,
            }),
            this._prisma.user.findFirstOrThrow({
                where  : { id: toUserId },
                include: prismaToDomainUserInclude,
            }),
        ]);

        if (user && toUser) {
            return [
                [
                    [ userId ],
                    DomainNotificationType.CALL_ANSWER_IN,
                    {
                        user: prismaUserToDomain(toUser),
                        answer,
                    },
                ],
                [
                    [ toUserId ],
                    DomainNotificationType.CALL_ANSWER_OUT,
                    {
                        user: prismaUserToDomain(user),
                        answer,
                    },
                ],
            ];
        }

        throw 'Users not exist';
    }

    async start (userId: string, toUserId: string): Promise<NotificationServiceResponse[]> {
        throw new Error('Method not implemented.');
    }

    async finish (userId: string, toUserId: string): Promise<NotificationServiceResponse[]> {
        throw new Error('Method not implemented.');
    }
}