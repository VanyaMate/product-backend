import {
    IDialogueService,
} from '@/domain/services/dialogue/dialogue-service.interface';
import { PrismaClient } from '@prisma/client';
import { DomainDialogue } from 'product-types/dist/dialogue/DomainDialogue';


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