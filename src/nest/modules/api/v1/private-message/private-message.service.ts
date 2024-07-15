import { Injectable } from '@nestjs/common';
import {
    IPrivateMessageService,
} from '@/domain/services/private-message/private-message-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaPrivateMessageService,
} from '@/domain/services/private-message/implementations/prisma-private-message.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import {
    DomainMessageCreateData,
} from 'product-types/dist/message/DomainMessageCreateData';
import {
    DomainMessageUpdateData,
} from 'product-types/dist/message/DomainMessageUpdateData';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';
import {
    globalExceptionServiceErrorResponse
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class PrivateMessageService {
    private readonly _service: IPrivateMessageService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _notificationService: NotificationService,
    ) {
        this._service = new PrismaPrivateMessageService(this._prisma);
    }

    async send (userId: string, dialogueId: string, messageData: DomainMessageCreateData) {
        try {
            const [ active, passive ] = await this._service.send(userId, dialogueId, messageData);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PrivateMessageService.name, 400, 'Cant send message'));
        }
    }

    async remove (userId: string, messageId: string) {
        try {
            const [ active, passive ] = await this._service.remove(userId, messageId);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PrivateMessageService.name, 400, 'Cant remove message'));
        }
    }

    async update (userId: string, messageId: string, messageData: DomainMessageUpdateData) {
        try {
            const [ active, passive ] = await this._service.redact(userId, messageId, messageData);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PrivateMessageService.name, 400, 'Cant update message'));
        }
    }

    async read (userId: string, messageId: string) {
        try {
            const [ active, passive ] = await this._service.read(userId, messageId);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PrivateMessageService.name, 400, 'Cant read message'));
        }
    }

    async readAll (userId: string, dialogueId: string) {
        try {
            const [ active, passive ] = await this._service.readAll(userId, dialogueId);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PrivateMessageService.name, 400, 'Cant read all messages'));
        }
    }
}