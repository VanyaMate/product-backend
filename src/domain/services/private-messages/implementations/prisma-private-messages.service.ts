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
                where: { privateDialogueId: dialogueId },
            }),
        ]);

        return {
            list : dialogue.privateMessage.map((message) => prismaPrivateMessageToDomain(message, message.author)),
            count: count,
        };
    }
}