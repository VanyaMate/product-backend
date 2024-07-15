import { Injectable } from '@nestjs/common';
import {
    IPrivateMessagesService,
} from '@/domain/services/private-messages/private-messages-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaPrivateMessagesService,
} from '@/domain/services/private-messages/implementations/prisma-private-messages.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    DomainSearchCursorOptions,
} from 'product-types/dist/search/DomainSearchCursorOptions';
import {
    globalExceptionServiceErrorResponse
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class PrivateMessagesService {
    private readonly _service: IPrivateMessagesService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaPrivateMessagesService(this._prisma);
    }

    async get (userId: string, dialogueId: string, options: DomainSearchItemOptions) {
        try {
            return await this._service.get(userId, dialogueId, options);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PrivateMessagesService.name, 400, 'Cant get messages'));
        }
    }

    async getByCursor (userId: string, dialogueId: string, options: DomainSearchCursorOptions) {
        try {
            return await this._service.getByCursor(userId, dialogueId, options);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PrivateMessagesService.name, 400, 'Cant get messages'));
        }
    }
}