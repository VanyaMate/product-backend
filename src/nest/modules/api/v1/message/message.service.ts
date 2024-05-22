import { Injectable } from '@nestjs/common';
import {
    IMessageService,
} from '@/domain/services/message/message-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';
import {
    PrismaMessageService,
} from '@/domain/services/message/implementations/prisma-message.service';
import { DomainMessageType } from 'product-types/dist/message/DomainMessage';
import {
    DomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';
import {
    DomainNotificationUserMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageDeletedData';
import {
    DomainNotificationUserMessageRedactedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageRedactedData';


@Injectable()
export class MessageService {
    private readonly _service: IMessageService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _notificationService: NotificationService,
    ) {
        this._service = new PrismaMessageService(this._prisma);
    }

    async send (authorId: string, dialogueId: string, messageType: DomainMessageType, messageBody: string): Promise<DomainNotificationUserMessageData> {
        const [ targets, notification ] = await this._service.send(authorId, dialogueId, messageType, messageBody);
        targets.forEach((target) => this._notificationService.userMessage(target, notification));
        return notification;
    }

    async redact (messageId: string, newMessageBody: string): Promise<DomainNotificationUserMessageRedactedData> {
        throw new Error('Method not implemented.');
    }

    async remove (messageId: string): Promise<DomainNotificationUserMessageDeletedData> {
        throw new Error('Method not implemented.');
    }


}