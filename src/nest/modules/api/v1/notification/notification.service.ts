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
import { UsersService } from '@/nest/modules/api/v1/users/users.service';
import { User } from '@prisma/client';
import {
    userPrismaToDomain,
} from '@/domain/services/user/converters/userPrismaToDomain';


@Injectable()
export class NotificationService {
    private readonly _connectionService: IConnectionsService<Request, Response>;
    private readonly _notificationService: INotificationService;

    constructor (private readonly _prisma: PrismaService) {
        this._connectionService   = new PrismaExpressSseConnectionsService(this._prisma);
        this._notificationService = new PrismaNotificationService(this._prisma, this._connectionService);
    }

    error (userId: string, data: DomainNotificationErrorData): Promise<DomainNotification> {
        return this._notificationService.error(userId, data);
    }

    connected (userId: string): Promise<DomainNotification> {
        return this._notificationService.connected(userId);
    }

    connecting (userId: string): Promise<DomainNotification> {
        return this._notificationService.connecting(userId);
    }

    disconnected (userId: string, data: DomainNotificationDisconnectedData): Promise<DomainNotification> {
        return this._notificationService.disconnected(userId, data);
    }

    tokensUpdate (userId: string, data: DomainNotificationTokensUpdateData): Promise<DomainNotification> {
        return this._notificationService.tokensUpdate(userId, data);
    }

    async userMessage (userId: string, data: DomainNotificationUserMessageData): Promise<DomainNotification> {
        return this._notificationService.userMessage(userId, data);
    }

    userMessageDeleted (userId: string, data: DomainNotificationUserMessageDeletedData): Promise<DomainNotification> {
        return this._notificationService.userMessageDeleted(userId, data);
    }

    userMessageRedacted (userId: string, data: DomainNotificationUserMessageRedactedData): Promise<DomainNotification> {
        return this._notificationService.userMessageRedacted(userId, data);
    }

    userMessageRead (userId: string, data: DomainNotificationUserMessageReadData): Promise<DomainNotification> {
        return this._notificationService.userMessageRead(userId, data);
    }

    async friendRequest (userId: string, fromUserId: string, message: string): Promise<DomainNotification> {
        const user = await this._prisma.user.findFirst({ where: { id: fromUserId } });
        return this._notificationService.friendRequest(userId, {
            user: userPrismaToDomain(user), message,
        });
    }

    async friendDeleted (userId: string, fromUserId: string): Promise<DomainNotification> {
        const user = await this._prisma.user.findFirst({ where: { id: fromUserId } });
        return this._notificationService.friendDeleted(userId, {
            user: userPrismaToDomain(user),
        });
    }

    async friendRequestAccepted (userId: string, fromUserId: string): Promise<DomainNotification> {
        const user = await this._prisma.user.findFirst({ where: { id: fromUserId } });
        return this._notificationService.friendRequestAccepted(userId, {
            user: userPrismaToDomain(user),
        });
    }

    async friendRequestCanceled (userId: string, fromUserId: string): Promise<DomainNotification> {
        const user = await this._prisma.user.findFirst({ where: { id: fromUserId } });
        return this._notificationService.friendRequestCanceled(userId, {
            user: userPrismaToDomain(user),
        });
    }

    add (userId: string, request: Request, response: Response) {
        return this._connectionService.add(userId, request, response);
    }
}