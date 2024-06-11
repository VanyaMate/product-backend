import {
    IPrivateDialogueService,
} from '@/domain/services/private-dialogue/private-dialogue-service.interface';
import { PrismaClient } from '@prisma/client';
import {
    DomainPrivateDialogue,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogue';
import {
    DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';
import {
    userPrismaToDomain,
} from '@/domain/services/user/converters/userPrismaToDomain';
import {
    prismaDomainUserSelector,
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';
import { DomainUser } from 'product-types/dist/user/DomainUser';


export class PrismaPrivateDialogueService implements IPrivateDialogueService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async create (userInId: string, userOutId: string): Promise<[ string[], DomainPrivateDialogue ][]> {
        // Check userOutId created
        // Check privateConversation created
        // Check userOut access to create conversation with userIn (TODO)
        const [ user, createdConversation, userIn ] = await this._prisma.$transaction([
            this._prisma.user.findFirst({
                where  : { id: userOutId },
                include: {
                    permissions: { select: { privateDialogue: true } },
                    friendsFrom: {
                        where: {
                            fromUserId: {
                                equals: userInId,
                            },
                        },
                    },
                    friendsTo  : {
                        where: {
                            toUserId: {
                                equals: userInId,
                            },
                        },
                    },
                },
            }),
            this._prisma.privateDialogue.findFirst({
                where: {
                    OR: [
                        { userInId, userOutId },
                        { userInId: userOutId, userOutId: userInId },
                    ],
                },
            }),
            this._prisma.user.findFirstOrThrow({
                where : {
                    id: userInId,
                },
                select: prismaDomainUserSelector,
            }),
        ]);
        if (!user) {
            throw 'User not exist';
        }
        if (createdConversation) {
            throw 'Conversation exist';
        }

        switch (user.permissions.privateDialogue) {
            case DomainUserPermissionsPrivateDialogue.ALL:
                return this._createConversationForUsers(
                    userIn, userPrismaToDomain(user),
                );
            case DomainUserPermissionsPrivateDialogue.FRIENDS:
                if (user.friendsFrom.length || user.friendsTo.length) {
                    return this._createConversationForUsers(
                        userIn, userPrismaToDomain(user),
                    );
                }
                throw 'No access';
            case DomainUserPermissionsPrivateDialogue.NONE:
                throw 'No access';
            default:
                throw 'Cant create dialogue';
        }
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

    private async _createConversationForUsers (userIn: DomainUser, userOut: DomainUser): Promise<[ string[], DomainPrivateDialogue ][]> {
        const conversation = await this._prisma.privateDialogue.create({
            data: { userInId: userIn.id, userOutId: userOut.id },
        });
        return [
            [
                [ userIn.id ],
                {
                    id         : conversation.id,
                    avatar     : conversation.avatar,
                    title      : conversation.title,
                    createdDate: conversation.creationDate.toUTCString(),
                    user       : userOut,
                    messages   : [],
                },
            ],
            [
                [ userOut.id ],
                {
                    id         : conversation.id,
                    avatar     : conversation.avatar,
                    title      : conversation.title,
                    createdDate: conversation.creationDate.toUTCString(),
                    user       : userIn,
                    messages   : [],
                },
            ],
        ];
    }

}