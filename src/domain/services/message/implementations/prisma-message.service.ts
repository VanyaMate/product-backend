import {
    IMessageService,
} from '@/domain/services/message/message-service.interface';
import { MessageType, PrismaClient } from '@prisma/client';
import {
    DomainMessage,
    DomainMessageType,
} from 'product-types/dist/message/DomainMessage';
import {
    DomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';
import {
    DomainNotificationUserMessageRedactedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageRedactedData';
import {
    DomainNotificationUserMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageDeletedData';
import {
    prismaDomainUserSelector,
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';


export class PrismaMessageService implements IMessageService {
    constructor (
        private readonly _prisma: PrismaClient,
    ) {
    }

    async send (authorId: string, dialogueId: string, messageType: DomainMessageType, messageBody: string): Promise<[ string[], DomainNotificationUserMessageData ]> {
        const message      = await this._prisma.message.create({
            data   : {
                authorId,
                message: messageBody,
                type   : MessageType[messageType] ?? MessageType.text,
            },
            include: {
                Author: {
                    select: prismaDomainUserSelector,
                },
            },
        });
        const { Dialogue } = await this._prisma.dialogueToMessage.create({
            data   : {
                dialogueId,
                messageId: message.id,
            },
            include: {
                Dialogue: {
                    select: {
                        LinkWithUsers: {
                            select: {
                                User: {
                                    select: prismaDomainUserSelector,
                                },
                            },
                        },
                        id           : true,
                        avatar       : true,
                        title        : true,
                    },
                },
            },
        });

        return [
            Dialogue.LinkWithUsers.filter((link) => link.User.id !== authorId).map((link) => link.User.id),
            {
                dialogue: {
                    id      : Dialogue.id,
                    title   : Dialogue.title,
                    avatar  : Dialogue.avatar,
                    users   : Dialogue.LinkWithUsers.map((link) => link.User),
                    messages: [],
                },
                message : {
                    id          : message.id,
                    dialogId    : dialogueId,
                    message     : message.message,
                    type        : DomainMessageType[message.type],
                    author      : message.Author,
                    creationDate: message.creationDate.toUTCString(),
                    redacted    : message.redacted,
                },
            },
        ];
    }

    async redact (messageId: string, newMessageBody: string): Promise<[ string[], DomainNotificationUserMessageRedactedData ]> {
        throw new Error('Method not implemented.');
    }

    async remove (messageId: string): Promise<[ string[], DomainNotificationUserMessageDeletedData ]> {
        throw new Error('Method not implemented.');
    }
}