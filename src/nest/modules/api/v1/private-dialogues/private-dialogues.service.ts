import { Injectable } from '@nestjs/common';
import {
    IPrivateDialoguesService,
} from '@/domain/services/private-dialogues/private-dialogues-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaPrivateDialoguesService,
} from '@/domain/services/private-dialogues/implementations/prisma-private-dialogues.service';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


@Injectable()
export class PrivateDialoguesService {
    private readonly _service: IPrivateDialoguesService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaPrivateDialoguesService(this._prisma);
    }

    async getList (userId: string, options: DomainSearchItemOptions) {
        try {
            return await this._service.getList(userId, options);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, PrivateDialoguesService.name, 400, 'Cant get dialogues'));
        }
    }

    async getOne (userId: string, dialogueId: string) {
        try {
            return await this._service.getOne(userId, dialogueId);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, PrivateDialoguesService.name, 400, 'Cant get dialogues'));
        }
    }
}