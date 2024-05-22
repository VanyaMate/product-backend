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


export class PrismaDialogueService implements IDialogueService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async create (user1Id: string, user2Id: string): Promise<DomainDialogue> {
        try {
            const dialogue: Dialogue = await this._prisma.dialogue.create({});
            await Promise.all([ user1Id, user2Id ].map((userId) => this._prisma.dialogueToUser.create({
                data: {
                    userId,
                    dialogueId: dialogue.id,
                },
            })));
            const filledDialogue = await this._prisma.dialogue.findUnique({
                where  : { id: dialogue.id },
                include: {
                    LinkWithUsers: {
                        include: {
                            User: {
                                select: prismaDomainUserSelector,
                            },
                        },
                    },
                },
            });
            return {
                id      : filledDialogue.id,
                messages: [],
                avatar  : dialogue.avatar,
                title   : dialogue.title,
                users   : filledDialogue.LinkWithUsers.map((link) => link.User),
            };
        } catch (e) {
            throw serviceErrorResponse(e, PrismaDialogueService.name, 400, 'Cant create or get dialogue');
        }
    }

    async remove (forUserId: string, dialogId: string): Promise<DomainDialogue> {
        throw new Error('Method not implemented.');
    }

    async archive (forUserId: string, dialogId: string): Promise<DomainDialogue> {
        throw new Error('Method not implemented.');
    }
}