import {
    IPrivateDialogueService,
} from '@/domain/services/private-dialogue/private-dialogue-service.interface';
import { PrismaClient } from '@prisma/client';
import {
    DomainPrivateDialogue,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogue';


export class PrismaPrivateDialogueService implements IPrivateDialogueService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async create (userInId: string, userOutId: string): Promise<[ string[], DomainPrivateDialogue ][]> {
        // Check userOutId created
        // Check privateConversation created
        // Check userOut access to create conversation with userIn (TODO)
        const [ user, createdConversation ] = await this._prisma.$transaction([
            this._prisma.user.findFirst({ where: { id: userOutId } }),
            this._prisma.privateDialogue.findFirst({
                where: {
                    OR: [
                        { userInId, userOutId },
                        { userInId: userOutId, userOutId: userInId },
                    ],
                },
            }),
        ]);
        if (!user) {
            throw 'User not exist';
        }
        if (createdConversation) {
            throw 'Conversation exist';
        }

        // Create conversation
        const conversation = await this._prisma.privateDialogue.create({
            data: { userInId, userOutId },
        });

        // Return NotificationResponse


        throw new Error('Method not implemented.');
    }

    async archive (userId: string, privateDialogueId: string): Promise<[ string[], DomainPrivateDialogue ][]> {
        throw new Error('Method not implemented.');
    }

    async remove (userId: string, privateDialogueId: string): Promise<[ string[], DomainPrivateDialogue ][]> {
        throw new Error('Method not implemented.');
    }

    async updateTitle (userId: string, privateDialogueId: string, title: string): Promise<[ string[], DomainPrivateDialogue ][]> {
        throw new Error('Method not implemented.');
    }

    async updateAvatar (userId: string, privateDialogueId: string, avatar: string): Promise<[ string[], DomainPrivateDialogue ][]> {
        throw new Error('Method not implemented.');
    }

}