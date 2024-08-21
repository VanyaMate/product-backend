import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { ICallService } from '@/domain/services/call/call-service.interface';
import {
    PrismaCallService,
} from '@/domain/services/call/implementations/prisma-call.service';
import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';
import { DomainCallAnswer } from 'product-types/dist/call/DomainCallAnswer';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';


@Injectable()
export class CallService {
    private readonly _service: ICallService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _notificationService: NotificationService,
    ) {
        this._service = new PrismaCallService(this._prisma);
    }

    async createOffer (userId: string, callId: string, offer: DomainCallOffer, connectionId: string) {
        try {
            const [ active, passive ] = await this._service.offer(userId, callId, offer, connectionId);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, CallService.name, 400, 'Cant create call offer'));
        }
    }

    async createAnswer (userId: string, callId: string, answer: DomainCallAnswer) {
        try {
            const [ active, passive ] = await this._service.answer(userId, callId, answer);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, CallService.name, 400, 'Cant create call answer'));
        }
    }

    async createCallRequest (userId: string, toUserId: string, connectionId: string) {
        try {
            const [ active, passive ] = await this._service.start(userId, toUserId, connectionId);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, CallService.name, 400, 'Cant create call request'));
        }
    }

    async finishCall (userId: string, callId: string) {
        try {
            const [ active, passive ] = await this._service.finish(userId, callId);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, CallService.name, 400, 'Cant finish call'));
        }
    }
}