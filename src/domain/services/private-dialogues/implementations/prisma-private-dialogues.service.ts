import {
    IPrivateDialoguesService,
} from '@/domain/services/private-dialogues/private-dialogues-service.interface';
import { PrismaClient } from '@prisma/client';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    prismaDomainUserSelector,
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';
import {
    prismaPrivateMessageToDomain,
} from '@/domain/services/message/converters/prismaPrivateMessageToDomain';


export class PrismaPrivateDialoguesService implements IPrivateDialoguesService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async getList (userId: string, searchOptions: DomainSearchItemOptions): Promise<DomainPrivateDialogueFull[]> {
        const dialogues = await this._prisma.privateDialogue.findMany({
            where  : {
                OR: [
                    { userOutId: userId },
                    { userInId: userId },
                ],
            },
            include: {
                userOut       : { select: prismaDomainUserSelector },
                userIn        : { select: prismaDomainUserSelector },
                privateMessage: {
                    take   : 1,
                    include: {
                        author: true,
                    },
                },
            },
            take   : searchOptions.limit ?? 10,
            skip   : searchOptions.offset ?? 0,
        });

        return dialogues.map((dialogue) => dialogue.userInId === userId ? ({
            id               : dialogue.id,
            title            : dialogue.title,
            avatar           : dialogue.avatar,
            createdDate      : dialogue.creationDate.toUTCString(),
            meArchived       : dialogue.userInArchived,
            meDeleted        : dialogue.userInDeleted,
            companionArchived: dialogue.userOutArchived,
            companionDeleted : dialogue.userOutDeleted,
            user             : dialogue.userOut,
            messages         : dialogue.privateMessage.map((message) => prismaPrivateMessageToDomain(message, message.author)),
        }) : ({
            id               : dialogue.id,
            title            : dialogue.title,
            avatar           : dialogue.avatar,
            createdDate      : dialogue.creationDate.toUTCString(),
            meArchived       : dialogue.userOutArchived,
            meDeleted        : dialogue.userOutDeleted,
            companionArchived: dialogue.userInArchived,
            companionDeleted : dialogue.userInDeleted,
            user             : dialogue.userIn,
            messages         : dialogue.privateMessage.map((message) => prismaPrivateMessageToDomain(message, message.author)),
        }));
    }

    async getOne (userId: string, privateDialogueId: string): Promise<DomainPrivateDialogueFull> {
        const dialogue = await this._prisma.privateDialogue.findFirst({
            where  : {
                id: privateDialogueId,
                OR: [
                    { userOutId: userId },
                    { userInId: userId },
                ],
            },
            include: {
                userOut       : { select: prismaDomainUserSelector },
                userIn        : { select: prismaDomainUserSelector },
                privateMessage: {
                    take   : 20,
                    include: {
                        author: true,
                    },
                },
            },
        });

        return dialogue.userInId === userId ? ({
            id               : dialogue.id,
            title            : dialogue.title,
            avatar           : dialogue.avatar,
            createdDate      : dialogue.creationDate.toUTCString(),
            meArchived       : dialogue.userInArchived,
            meDeleted        : dialogue.userInDeleted,
            companionArchived: dialogue.userOutArchived,
            companionDeleted : dialogue.userOutDeleted,
            user             : dialogue.userOut,
            messages         : dialogue.privateMessage.map((message) => prismaPrivateMessageToDomain(message, message.author)),
        }) : ({
            id               : dialogue.id,
            title            : dialogue.title,
            avatar           : dialogue.avatar,
            createdDate      : dialogue.creationDate.toUTCString(),
            meArchived       : dialogue.userOutArchived,
            meDeleted        : dialogue.userOutDeleted,
            companionArchived: dialogue.userInArchived,
            companionDeleted : dialogue.userInDeleted,
            user             : dialogue.userIn,
            messages         : dialogue.privateMessage.map((message) => prismaPrivateMessageToDomain(message, message.author)),
        });
    }
}