import { Injectable } from '@nestjs/common';
import {
    IConnectionsService,
} from '@/domain/services/connections/connections-service.interface';
import { Request, Response } from 'express';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaExpressSseConnectionsService,
} from '@/domain/services/connections/implementations/prisma-express-sse-connections.service';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    INotificationService,
} from '@/domain/services/notification/notification-service.interface';
import {
    PrismaNotificationService,
} from '@/domain/services/notification/implementations/prisma-notification.service';
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
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageData';
import {
    DomainNotificationUserMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageDeletedData';
import {
    DomainNotificationUserMessageRedactedData,
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageRedactedData';
import {
    DomainNotificationUserMessageReadData,
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageReadData';
import {
    DomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestData';
import {
    DomainNotificationFriendDeletedData,
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendDeletedData';
import {
    DomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestAcceptedData';
import {
    DomainNotificationFriendRequestCanceledData,
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestCanceledData';
import {
    DomainNotificationPrivateDialogueCreateData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueCreateData';
import {
    DomainNotificationPrivateDialogueDeletedData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueDeletedData';
import {
    DomainNotificationPrivateDialogueArchiveData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueArchiveData';
import {
    DomainNotificationPrivateDialogueUpdatedData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueUpdatedData';


@Injectable()
export class NotificationService implements INotificationService {
    private readonly _connectionService: IConnectionsService<Request, Response>;
    private readonly _notificationService: INotificationService;

    constructor (private readonly _prisma: PrismaService) {
        this._connectionService   = new PrismaExpressSseConnectionsService(this._prisma);
        this._notificationService = new PrismaNotificationService(this._prisma, this._connectionService);
    }

    async send (notifications: Array<NotificationServiceResponse>): Promise<void> {
        return this._notificationService.send(notifications);
    }

    async error (userId: string, data: DomainNotificationErrorData): Promise<DomainNotification> {
        return this._notificationService.error(userId, data);
    }

    async connected (userId: string): Promise<DomainNotification> {
        return this._notificationService.connected(userId);
    }

    async connecting (userId: string): Promise<DomainNotification> {
        return this._notificationService.connecting(userId);
    }

    async disconnected (userId: string, data: DomainNotificationDisconnectedData): Promise<DomainNotification> {
        return this._notificationService.disconnected(userId, data);
    }

    async tokensUpdate (userId: string, data: DomainNotificationTokensUpdateData): Promise<DomainNotification> {
        return this._notificationService.tokensUpdate(userId, data);
    }

    async userMessageIn (userId: string, data: DomainNotificationUserMessageData): Promise<DomainNotification> {
        return this._notificationService.userMessageIn(userId, data);
    }

    async userMessageOut (userId: string, data: DomainNotificationUserMessageData): Promise<DomainNotification> {
        return this._notificationService.userMessageOut(userId, data);
    }

    async userMessageDeletedIn (userId: string, data: DomainNotificationUserMessageDeletedData): Promise<DomainNotification> {
        return this._notificationService.userMessageDeletedIn(userId, data);
    }

    async userMessageDeletedOut (userId: string, data: DomainNotificationUserMessageDeletedData): Promise<DomainNotification> {
        return this._notificationService.userMessageDeletedOut(userId, data);
    }

    async userMessageRedactedIn (userId: string, data: DomainNotificationUserMessageRedactedData): Promise<DomainNotification> {
        return this._notificationService.userMessageRedactedIn(userId, data);
    }

    async userMessageRedactedOut (userId: string, data: DomainNotificationUserMessageRedactedData): Promise<DomainNotification> {
        return this._notificationService.userMessageRedactedOut(userId, data);
    }

    async userMessageReadIn (userId: string, data: DomainNotificationUserMessageReadData): Promise<DomainNotification> {
        return this._notificationService.userMessageReadIn(userId, data);
    }

    async userMessageReadOut (userId: string, data: DomainNotificationUserMessageReadData): Promise<DomainNotification> {
        return this._notificationService.userMessageReadOut(userId, data);
    }

    async friendRequestIn (userId: string, data: DomainNotificationFriendRequestData): Promise<DomainNotification> {
        return this._notificationService.friendRequestIn(userId, data);
    }

    async friendRequestOut (userId: string, data: DomainNotificationFriendRequestData): Promise<DomainNotification> {
        return this._notificationService.friendRequestOut(userId, data);
    }

    async friendDeletedIn (userId: string, data: DomainNotificationFriendDeletedData): Promise<DomainNotification> {
        return this._notificationService.friendDeletedIn(userId, data);
    }

    async friendDeletedOut (userId: string, data: DomainNotificationFriendDeletedData): Promise<DomainNotification> {
        return this._notificationService.friendDeletedOut(userId, data);
    }

    async friendRequestAcceptedIn (userId: string, data: DomainNotificationFriendRequestAcceptedData): Promise<DomainNotification> {
        return this._notificationService.friendRequestAcceptedIn(userId, data);
    }

    async friendRequestAcceptedOut (userId: string, data: DomainNotificationFriendRequestAcceptedData): Promise<DomainNotification> {
        return this._notificationService.friendRequestAcceptedOut(userId, data);
    }

    async friendRequestCanceledIn (userId: string, data: DomainNotificationFriendRequestCanceledData): Promise<DomainNotification> {
        return this._notificationService.friendRequestCanceledIn(userId, data);
    }

    async friendRequestCanceledOut (userId: string, data: DomainNotificationFriendRequestCanceledData): Promise<DomainNotification> {
        return this._notificationService.friendRequestCanceledOut(userId, data);
    }

    async privateDialogueCreatedIn (userId: string, data: DomainNotificationPrivateDialogueCreateData): Promise<DomainNotification> {
        return this._notificationService.privateDialogueCreatedIn(userId, data);
    }

    async privateDialogueCreatedOut (userId: string, data: DomainNotificationPrivateDialogueCreateData): Promise<DomainNotification> {
        return this._notificationService.privateDialogueCreatedOut(userId, data);
    }

    async privateDialogueDeletedIn (userId: string, data: DomainNotificationPrivateDialogueDeletedData): Promise<DomainNotification> {
        return this._notificationService.privateDialogueDeletedIn(userId, data);
    }

    async privateDialogueDeletedOut (userId: string, data: DomainNotificationPrivateDialogueDeletedData): Promise<DomainNotification> {
        return this._notificationService.privateDialogueDeletedOut(userId, data);
    }

    async privateDialogueArchivedIn (userId: string, data: DomainNotificationPrivateDialogueArchiveData): Promise<DomainNotification> {
        return this._notificationService.privateDialogueArchivedIn(userId, data);
    }

    async privateDialogueArchivedOut (userId: string, data: DomainNotificationPrivateDialogueArchiveData): Promise<DomainNotification> {
        return this._notificationService.privateDialogueArchivedOut(userId, data);
    }

    async privateDialogueUpdatedIn (userId: string, data: DomainNotificationPrivateDialogueUpdatedData): Promise<DomainNotification> {
        return this._notificationService.privateDialogueUpdatedIn(userId, data);
    }

    async privateDialogueUpdatedOut (userId: string, data: DomainNotificationPrivateDialogueUpdatedData): Promise<DomainNotification> {
        return this._notificationService.privateDialogueUpdatedOut(userId, data);
    }

    add (userId: string, request: Request, response: Response) {
        return this._connectionService.add(userId, request, response);
    }
}