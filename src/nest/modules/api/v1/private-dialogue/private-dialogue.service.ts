import { Injectable } from '@nestjs/common';
import {
    IPrivateDialogueService,
} from '@/domain/services/private-dialogue/private-dialogue-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaPrivateDialogueService,
} from '@/domain/services/private-dialogue/implementations/prisma-private-dialogue.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';


@Injectable()
export class PrivateDialogueService {
    private readonly _service: IPrivateDialogueService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _notificationService: NotificationService,
    ) {
        this._service = new PrismaPrivateDialogueService(this._prisma);
    }

    async create (userInitiatorId: string, userPassiveId: string) {
        try {
            const [ active, passive ] = await this._service.create(userInitiatorId, userPassiveId);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, PrivateDialogueService.name, 400, 'Cant create dialogue'));
        }
    }

    async archive (userInitiatorId: string, dialogueId: string) {
        try {
            const [ active, passive ] = await this._service.archive(userInitiatorId, dialogueId);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, PrivateDialogueService.name, 400, 'Cant archive dialogue'));
        }
    }

    async unArchive (userInitiatorId: string, dialogueId: string) {
        try {
            const [ active, passive ] = await this._service.unArchive(userInitiatorId, dialogueId);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, PrivateDialogueService.name, 400, 'Cant archive dialogue'));
        }
    }

    async remove (userInitiatorId: string, dialogueId: string) {
        try {
            const [ active, passive ] = await this._service.remove(userInitiatorId, dialogueId);
            this._notificationService.send([ active, passive ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, PrivateDialogueService.name, 400, 'Cant remove dialogue'));
        }
    }

}