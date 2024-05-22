import { Injectable } from '@nestjs/common';
import {
    IDialogueService,
} from '@/domain/services/dialogue/dialogue-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { DomainDialogue } from 'product-types/dist/dialog/DomainDialogue';
import {
    PrismaDialogueService,
} from '@/domain/services/dialogue/implementations/prisma-dialogue.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


@Injectable()
export class DialogueService {
    private readonly _service: IDialogueService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaDialogueService(this._prisma);
    }

    async create (user1Id: string, user2Id: string): Promise<DomainDialogue> {
        try {
            return await this._service.create(user1Id, user2Id);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, DialogueService.name, 400, 'Cant create dialogue'));
        }
    }

    async remove (userInitiatorId: string, dialogId: string): Promise<DomainDialogue> {
        try {
            return await this._service.remove(userInitiatorId, dialogId);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, DialogueService.name, 400, 'Cant remove dialogue'));
        }
    }

    async archive (userInitiatorId: string, dialogId: string): Promise<DomainDialogue> {
        try {
            return await this._service.archive(userInitiatorId, dialogId);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, DialogueService.name, 400, 'Cant archive dialogue'));
        }
    }
}