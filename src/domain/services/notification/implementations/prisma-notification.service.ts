import {
    INotificationService,
} from '@/domain/services/notification/notification-service.interface';
import { Notification, Prisma, PrismaClient } from '@prisma/client';
import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    IConnectionsService,
} from '@/domain/services/connections/connections-service.interface';
import { Request, Response } from 'express';
import {
    ISseSenderService,
} from '@/domain/services/sse-sender/sse-sender-service.interface';
import {
    SseSenderService,
} from '@/domain/services/sse-sender/implementations/sse-sender.service';
import {
    DomainNotificationErrorData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationErrorData';
import {
    DomainNotificationDisconnectedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationDisconnectedData';
import {
    DomainNotificationTokensUpdateData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationTokensUpdateData';
import {
    DomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';
import {
    DomainNotificationUserMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageDeletedData';
import {
    DomainNotificationUserMessageRedactedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageRedactedData';
import {
    DomainNotificationUserMessageReadData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageReadData';
import {
    DomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';
import {
    DomainNotificationFriendDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendDeletedData';
import {
    DomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestAcceptedData';
import {
    DomainNotificationFriendRequestCanceledData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestCanceledData';
import {
    notificationFactory,
} from '@/domain/services/notification/factory/notification-factory';


export class PrismaNotificationService implements INotificationService {
    private readonly _sseSender: ISseSenderService<Response>;

    constructor (
        private readonly _prisma: PrismaClient,
        private readonly _connectionService: IConnectionsService<Request, Response>,
    ) {
        this._sseSender = new SseSenderService();
    }

    async error (userId: string, data: DomainNotificationErrorData): Promise<DomainNotification> {
        return this._notify(userId, this._notification(DomainNotificationType.ERROR, data));
    }

    async connected (userId: string): Promise<DomainNotification> {
        return this._notify(userId, this._notification(DomainNotificationType.CONNECTED));
    }

    async connecting (userId: string): Promise<DomainNotification> {
        return this._notify(userId, this._notification(DomainNotificationType.CONNECTED));
    }

    async disconnected (userId: string, data: DomainNotificationDisconnectedData): Promise<DomainNotification> {
        return this._notify(userId, this._notification(DomainNotificationType.DISCONNECTED, data));
    }

    async tokensUpdate (userId: string, data: DomainNotificationTokensUpdateData): Promise<DomainNotification> {
        return this._notify(userId, this._notification(DomainNotificationType.TOKENS_UPDATE, data));
    }

    async userMessage (userId: string, data: DomainNotificationUserMessageData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async userMessageDeleted (userId: string, data: DomainNotificationUserMessageDeletedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_DELETED,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async userMessageRedacted (userId: string, data: DomainNotificationUserMessageRedactedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_REDACTED,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async userMessageRead (userId: string, data: DomainNotificationUserMessageReadData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_READ,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendRequest (userId: string, data: DomainNotificationFriendRequestData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_REQUEST,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendDeleted (userId: string, data: DomainNotificationFriendDeletedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_DELETED,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendRequestAccepted (userId: string, data: DomainNotificationFriendRequestAcceptedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_REQUEST_ACCEPTED,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendRequestCanceled (userId: string, data: DomainNotificationFriendRequestCanceledData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_REQUEST_CANCELED,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    private async _create (data: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>): Promise<Notification> {
        return this._prisma.notification.create({ data });
    }

    private async _notify (userId: string, notification: DomainNotification): Promise<DomainNotification> {
        const connections = await this._connectionService.getAllByUserId(userId);
        connections.forEach((connection) => this._sseSender.send(connection, notification));
        return notification;
    }

    private _notification (type: DomainNotificationType, data: unknown = ''): DomainNotification {
        return {
            id          : '',
            creationDate: new Date().toUTCString(),
            type,
            data,
        };
    }
}