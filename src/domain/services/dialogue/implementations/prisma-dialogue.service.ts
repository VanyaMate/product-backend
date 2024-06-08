import {
    IDialogueService,
} from '@/domain/services/dialogue/dialogue-service.interface';
import { Dialogue, PrismaClient } from '@prisma/client';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import { DomainDialogue } from 'product-types/dist/dialog/DomainDialogue';
import {
    prismaDomainUserSelector,
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';


export class PrismaDialogueService implements IDialogueService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async createPrivate (userId: string, withUserId: string): Promise<[ string[], DomainDialogue ][]> {
        throw new Error('Method not implemented.');
    }

    async create (userId: string, userIds: string[]): Promise<[ string[], DomainDialogue ][]> {
        throw new Error('Method not implemented.');
    }

    async leave (userId: string, dialogueId: string): Promise<[ string[], DomainDialogue ][]> {
        throw new Error('Method not implemented.');
    }

    async archive (userId: string, dialogueId: string): Promise<[ string[], DomainDialogue ][]> {
        throw new Error('Method not implemented.');
    }

    async updateTitle (userId: string, dialogueId: string, title: string): Promise<[ string[], DomainDialogue ][]> {
        throw new Error('Method not implemented.');
    }

    async updateAvatar (userId: string, dialogueId: string, avatar: string): Promise<[ string[], DomainDialogue ][]> {
        throw new Error('Method not implemented.');
    }
}