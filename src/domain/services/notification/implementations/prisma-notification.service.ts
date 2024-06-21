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
import {
    DomainNotificationPrivateDialogueArchiveData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueArchiveData';
import {
    DomainNotificationPrivateDialogueCreateData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueCreateData';
import {
    DomainNotificationPrivateDialogueDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueDeletedData';
import {
    DomainNotificationPrivateDialogueUpdatedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueUpdatedData';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';


export class PrismaNotificationService implements INotificationService {
    private readonly _sseSender: ISseSenderService<Response>;

    constructor (
        private readonly _prisma: PrismaClient,
        private readonly _connectionService: IConnectionsService<Request, Response>,
    ) {
        this._sseSender = new SseSenderService();
    }

    async send (notifications: Array<NotificationServiceResponse>): Promise<void> {
        return Promise.all(
            notifications.map((notification) => {
                if (Array.isArray(notification)) {
                    const [ ids, type, data ] = notification;
                    return Promise.all(
                        ids.map(async (id) => {
                            if (data) {
                                return this
                                    ._create({
                                        data,
                                        type,
                                        userId: id,
                                    })
                                    .then((notification) => ({
                                        ...notification,
                                        creationDate: notification.creationDate.toUTCString(),
                                    }))
                                    .then((notification) => this._notify(id, notificationFactory(notification)));
                            }
                        }),
                    );
                }
            }),
        ).then();
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

    async userMessageIn (userId: string, data: DomainNotificationUserMessageData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async userMessageOut (userId: string, data: DomainNotificationUserMessageData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async userMessageDeletedIn (userId: string, data: DomainNotificationUserMessageDeletedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_DELETED_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async userMessageDeletedOut (userId: string, data: DomainNotificationUserMessageDeletedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_DELETED_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async userMessageRedactedIn (userId: string, data: DomainNotificationUserMessageRedactedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_REDACTED_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async userMessageRedactedOut (userId: string, data: DomainNotificationUserMessageRedactedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_REDACTED_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async userMessageReadIn (userId: string, data: DomainNotificationUserMessageReadData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_READ_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async userMessageReadOut (userId: string, data: DomainNotificationUserMessageReadData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.USER_MESSAGE_READ_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendRequestIn (userId: string, data: DomainNotificationFriendRequestData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_REQUEST_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendRequestOut (userId: string, data: DomainNotificationFriendRequestData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_REQUEST_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendDeletedIn (userId: string, data: DomainNotificationFriendDeletedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_DELETED_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendDeletedOut (userId: string, data: DomainNotificationFriendDeletedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_DELETED_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendRequestAcceptedIn (userId: string, data: DomainNotificationFriendRequestAcceptedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendRequestAcceptedOut (userId: string, data: DomainNotificationFriendRequestAcceptedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendRequestCanceledIn (userId: string, data: DomainNotificationFriendRequestCanceledData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_REQUEST_CANCELED_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async friendRequestCanceledOut (userId: string, data: DomainNotificationFriendRequestCanceledData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async privateDialogueCreatedIn (userId: string, data: DomainNotificationPrivateDialogueCreateData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.PRIVATE_DIALOGUE_CREATED_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async privateDialogueCreatedOut (userId: string, data: DomainNotificationPrivateDialogueCreateData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.PRIVATE_DIALOGUE_CREATED_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async privateDialogueDeletedIn (userId: string, data: DomainNotificationPrivateDialogueDeletedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.PRIVATE_DIALOGUE_DELETED_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async privateDialogueDeletedOut (userId: string, data: DomainNotificationPrivateDialogueDeletedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.PRIVATE_DIALOGUE_DELETED_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async privateDialogueArchivedIn (userId: string, data: DomainNotificationPrivateDialogueArchiveData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async privateDialogueArchivedOut (userId: string, data: DomainNotificationPrivateDialogueArchiveData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_OUT,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async privateDialogueUpdatedIn (userId: string, data: DomainNotificationPrivateDialogueUpdatedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.PRIVATE_DIALOGUE_UPDATED_IN,
        });
        return this._notify(userId, notificationFactory(notification));
    }

    async privateDialogueUpdatedOut (userId: string, data: DomainNotificationPrivateDialogueUpdatedData): Promise<DomainNotification> {
        const notification = await this._create({
            userId,
            data,
            type: DomainNotificationType.PRIVATE_DIALOGUE_UPDATED_OUT,
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
            viewed      : false,
            type,
            data,
        };
    }
}