import {
    IPrivateMessagesService,
} from '@/domain/services/private-messages/private-messages-service.interface';
import { PrismaClient } from '@prisma/client';
import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    prismaDomainUserSelector,
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';
import {
    prismaPrivateMessageToDomain,
} from '@/domain/services/message/converters/prismaPrivateMessageToDomain';
import {
    DomainSearchCursorOptions,
} from 'product-types/dist/search/DomainSearchCursorOptions';


export class PrismaPrivateMessagesService implements IPrivateMessagesService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async get (userId: string, dialogueId: string, options: DomainSearchItemOptions): Promise<DomainSearchItem> {
        const [ dialogue, count ] = await this._prisma.$transaction([
            this._prisma.privateDialogue.findFirst({
                where  : {
                    id: dialogueId,
                    OR: [
                        { userInId: userId },
                        { userOutId: userId },
                    ],
                },
                include: {
                    privateMessage: {
                        where  : {
                            message: {
                                contains: options.query,
                            },
                        },
                        include: {
                            author: {
                                select: prismaDomainUserSelector,
                            },
                        },
                        skip   : options.offset,
                        take   : options.limit,
                    },
                },
            }),
            this._prisma.privateMessage.count({
                where: {
                    privateDialogueId: dialogueId,
                    message          : { contains: options.query },
                },
            }),
        ]);

        return {
            list : dialogue.privateMessage.map((message) => prismaPrivateMessageToDomain(message, message.author)),
            count: count,
        };
    }

    async getByCursor (userId: string, dialogueId: string, options: DomainSearchCursorOptions): Promise<DomainSearchItem> {
        const [ dialogue, count ] = await this._prisma.$transaction([
            this._prisma.privateDialogue.findFirst({
                where  : {
                    id: dialogueId,
                    OR: [
                        { userInId: userId },
                        { userOutId: userId },
                    ],
                },
                include: {
                    privateMessage: {
                        where  : {
                            message: {
                                contains: options.query,
                            },
                        },
                        cursor : {
                            id: options.cursor,
                        },
                        include: {
                            author: {
                                select: prismaDomainUserSelector,
                            },
                        },
                        orderBy: {
                            id: 'asc',
                        },
                        skip   : 1,
                        take   : -options.limit,
                    },
                },
            }),
            this._prisma.privateMessage.count({
                where: {
                    privateDialogueId: dialogueId,
                    message          : { contains: options.query },
                },
            }),
        ]);

        return {
            list : dialogue.privateMessage.map((message) => prismaPrivateMessageToDomain(message, message.author)),
            count: count,
        };
    }
}