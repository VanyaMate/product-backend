import {
    INotificationService,
} from '@/domain/services/notification/notification-service.interface';
import {
    Notification,
    NotificationType,
    Prisma,
    PrismaClient, User,
} from '@prisma/client';
import {
    DomainNotification, DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    IConnectionsService,
} from '@/domain/services/connections/connections-service.interface';
import { Request, Response } from 'express';
import {
    notificationFactory,
} from '@/domain/services/notification/factory/notification-factory';
import {
    ISseSenderService,
} from '@/domain/services/sse-sender/sse-sender-service.interface';
import {
    SseSenderService,
} from '@/domain/services/sse-sender/implementations/sse-sender.service';
import { isDate } from 'class-validator';


export class PrismaNotificationService implements INotificationService<DomainNotificationType, DomainNotification> {
    private readonly _sseSender: ISseSenderService<Response>;

    constructor (
        private readonly _prisma: PrismaClient,
        private readonly _connectionService: IConnectionsService<Request, Response>,
    ) {
        this._sseSender = new SseSenderService();
    }

    async sendByUserId (userId: string, type: DomainNotificationType, data: Prisma.JsonValue): Promise<DomainNotification> {
        let notification: DomainNotification | Notification = null;
        if (NotificationType[type] !== undefined) {
            notification = await this._prisma.notification.create({
                data: {
                    user_id: userId,
                    type   : NotificationType[type],
                    data   : data,
                },
            });
        } else {
            notification = {
                id          : '',
                creationDate: new Date().toUTCString(),
                type,
                data,
            };
        }
        notification.creationDate                    = new Date(notification.creationDate).toUTCString();
        const domainNotification: DomainNotification = notificationFactory(notification);
        const connections                            = await this._connectionService.getAllByUserId(userId);

        connections.forEach((connection) => this._sseSender.send(connection, domainNotification));
        return domainNotification;
    }

    async sendByUserLogin (userLogin: string, type: DomainNotificationType, data: Prisma.JsonValue): Promise<DomainNotification> {
        const user: User = await this._prisma.user.findFirst({ where: { login: userLogin } });
        if (user) {
            return this.sendByUserId(user.id, type, data);
        }
    }
}