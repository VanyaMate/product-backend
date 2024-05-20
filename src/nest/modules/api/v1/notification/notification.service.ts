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
    DomainNotification, DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    INotificationService,
} from '@/domain/services/notification/notification-service.interface';
import {
    PrismaNotificationService,
} from '@/domain/services/notification/implementations/prisma-notification.service';
import { NotificationType, Prisma } from '@prisma/client';


@Injectable()
export class NotificationService {
    private readonly _connectionService: IConnectionsService<Request, Response>;
    private readonly _notificationService: INotificationService<DomainNotificationType, DomainNotification>;

    constructor (private readonly _prisma: PrismaService) {
        this._connectionService   = new PrismaExpressSseConnectionsService(this._prisma);
        this._notificationService = new PrismaNotificationService(this._prisma, this._connectionService);
    }

    add (userId: string, request: Request, response: Response) {
        return this._connectionService.add(userId, request, response);
    }

    async sendToUser (login: string, type: DomainNotificationType, data: Prisma.JsonValue) {
        return this._notificationService.sendByUserLogin(login, type, data);
    }

    async sendToUserById (userId: string, type: DomainNotificationType, data: Prisma.JsonValue) {
        return this._notificationService.sendByUserId(userId, type, data);
    }
}