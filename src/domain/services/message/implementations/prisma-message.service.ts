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
        throw new Error('Method not implemented.');
    }

    async redact (messageId: string, newMessageBody: string): Promise<[ string[], DomainNotificationUserMessageRedactedData ]> {
        throw new Error('Method not implemented.');
    }

    async remove (messageId: string): Promise<[ string[], DomainNotificationUserMessageDeletedData ]> {
        throw new Error('Method not implemented.');
    }
}