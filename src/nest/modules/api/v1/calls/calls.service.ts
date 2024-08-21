import { Injectable } from '@nestjs/common';
import { ICallsService } from '@/domain/services/calls/calls-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaCallsService,
} from '@/domain/services/calls/implements/prisma-calls.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class CallsService {
    private readonly _service: ICallsService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaCallsService(this._prisma);
    }

    async getMyNotFinishedCalls (userId: string, cursor?: string, limit?: number) {
        try {
            return await this._service.getMyNotFinishedCalls(userId, cursor, limit);
        } catch (e) {
            return new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, CallsService.name, 400, 'Cant get calls'));
        }
    }
}