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
        const createdDialogue = await this._prisma.dialogue.findFirst({
            where  : {
                isPrivate    : true,
                LinkWithUsers: {
                    some: { userId },
                },
                AND          : {
                    LinkWithUsers: {
                        some: { userId: withUserId },
                    },
                },
            },
            include: {
                LinkWithUsers   : {
                    include: {
                        User: {
                            select: prismaDomainUserSelector,
                        },
                    },
                },
                LinkWithMessages: {
                    include: {
                        Message: {
                            include: {
                                Author: {
                                    select: prismaDomainUserSelector,
                                },
                            },
                        },
                    },
                },
            },
        });

        if (createdDialogue) {
            return [
                [
                    [],
                    {
                        id      : createdDialogue.id,
                        messages: createdDialogue.LinkWithMessages.map(({ Message }) => ({
                            author      : Message.Author,
                            creationDate: Message.creationDate.toUTCString(),
                            message     : Message.message,
                            type        : Message.type,
                            id          : Message.id,
                            dialogId    : createdDialogue.id,
                            redacted    : Message.redacted,
                        }) as DomainMessage),
                        users   : createdDialogue.LinkWithUsers.map(({ User }) => User),
                        avatar  : createdDialogue.avatar,
                        title   : createdDialogue.title,
                    },
                ],
            ];
        }

        const dialogue      = await this._prisma.dialogue.create({ data: { isPrivate: true } });
        const dialogueLinks = await this._prisma.dialogueToUser.createMany({
            data: [
                { dialogueId: dialogue.id, userId },
                { dialogueId: dialogue.id, userId: withUserId },
            ],
        });
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