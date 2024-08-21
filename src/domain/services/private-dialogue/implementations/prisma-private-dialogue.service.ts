import {
    IPrivateDialogueService,
} from '@/domain/services/private-dialogue/private-dialogue-service.interface';
import { PrismaClient } from '@prisma/client';
import {
    DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';
import {
    prismaDomainUserSelector,
} from '@/domain/services/users/selectors/prisma/prisma-domain-user.selector';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    prismaPrivateDialogueToDomain,
} from '@/domain/services/private-dialogue/converters/prismaPrivateDialogueToDomain';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { DomainMessageType } from 'product-types/dist/message/DomainMessage';
import {
    prismaPrivateDialogueWithUserToDomain,
} from '@/domain/services/private-dialogue/converters/prismaPrivateDialogueWithUserToDomain';
import {
    prismaPrivateMessageToDomain,
} from '@/domain/services/message/converters/prismaPrivateMessageToDomain';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';


export class PrismaPrivateDialogueService implements IPrivateDialogueService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async create (userInId: string, userOutId: string): Promise<NotificationServiceResponse[]> {
        // Check userOutId created
        // Check privateDialogue created
        // Check userOut access to create dialogue with userIn
        const [ user, createdDialogue, userIn ] = await this._prisma.$transaction([
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
                    connections: { take: 1 },
                },
            }),
            this._prisma.privateDialogue.findFirst({
                where  : {
                    OR: [
                        { userInId, userOutId },
                        { userInId: userOutId, userOutId: userInId },
                    ],
                },
                include: {
                    userIn        : { include: prismaToDomainUserInclude },
                    userOut       : { include: prismaToDomainUserInclude },
                    privateMessage: {
                        take   : 10,
                        include: {
                            author: { include: prismaToDomainUserInclude },
                        },
                    },
                },
            }),
            this._prisma.user.findFirstOrThrow({
                where  : {
                    id: userInId,
                },
                include: prismaToDomainUserInclude,
            }),
        ]);
        if (!user) {
            throw 'User not exist';
        }

        if (createdDialogue) {
            if (createdDialogue.userInId === userInId) {
                if (createdDialogue.userInDeleted) {
                    await this._prisma.privateDialogue.update({
                        where: { id: createdDialogue.id },
                        data : { userInDeleted: false },
                    });

                    return [
                        [
                            [ userInId ],
                            DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_IN,
                            {
                                dialogue: {
                                    ...prismaPrivateDialogueToDomain(createdDialogue),
                                    createdDate      : createdDialogue.creationDate.getTime(),
                                    meArchived       : createdDialogue.userInArchived,
                                    meDeleted        : createdDialogue.userInDeleted,
                                    companionArchived: createdDialogue.userOutArchived,
                                    companionDeleted : createdDialogue.userOutDeleted,
                                    user             : prismaUserToDomain(createdDialogue.userOut),
                                    messages         : createdDialogue.privateMessage.map((message) => prismaPrivateMessageToDomain(message, prismaUserToDomain(message.author))),
                                },
                            },
                        ],
                        [
                            [ userOutId ],
                            DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_OUT,
                            {
                                dialogue: prismaPrivateDialogueWithUserToDomain(createdDialogue, prismaUserToDomain(createdDialogue.userIn)),
                            },
                        ],
                    ];
                }
            } else {
                if (createdDialogue.userOutDeleted) {
                    await this._prisma.privateDialogue.update({
                        where: { id: createdDialogue.id },
                        data : { userOutDeleted: false },
                    });

                    return [
                        [
                            [ userInId ],
                            DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_IN,
                            {
                                dialogue: {
                                    ...prismaPrivateDialogueToDomain(createdDialogue),
                                    createdDate      : createdDialogue.creationDate.getTime(),
                                    meArchived       : createdDialogue.userInArchived,
                                    meDeleted        : createdDialogue.userInDeleted,
                                    companionArchived: createdDialogue.userOutArchived,
                                    companionDeleted : createdDialogue.userOutDeleted,
                                    user             : prismaUserToDomain(createdDialogue.userIn),
                                    messages         : createdDialogue.privateMessage.map((message) => prismaPrivateMessageToDomain(message, prismaUserToDomain(message.author))),
                                },
                            },
                        ],
                        [
                            [ userOutId ],
                            DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_OUT,
                            {
                                dialogue: prismaPrivateDialogueWithUserToDomain(createdDialogue, prismaUserToDomain(createdDialogue.userOut)),
                            },
                        ],
                    ];
                }
            }

            throw 'Dialogue exist';
        } else {
            switch (user.permissions.privateDialogue) {
                case DomainUserPermissionsPrivateDialogue.ALL:
                    return this._createConversationForUsers(
                        prismaUserToDomain(userIn),
                        prismaUserToDomain(user),
                    );
                case DomainUserPermissionsPrivateDialogue.FRIENDS:
                    if (user.friendsFrom.length || user.friendsTo.length) {
                        return this._createConversationForUsers(
                            prismaUserToDomain(userIn),
                            prismaUserToDomain(user),
                        );
                    }
                    throw 'No access';
                case DomainUserPermissionsPrivateDialogue.NONE:
                    throw 'No access';
                default:
                    throw 'Cant create dialogue';
            }
        }
    }

    async archive (userId: string, privateDialogueId: string): Promise<NotificationServiceResponse[]> {
        // get dialogue or throw
        // archive dialogue
        const dialogue = await this._prisma.privateDialogue.findFirstOrThrow({
            where  : {
                id: privateDialogueId,
                OR: [
                    { userInId: userId },
                    { userOutId: userId },
                ],
            },
            include: {
                userIn : { include: prismaToDomainUserInclude },
                userOut: { include: prismaToDomainUserInclude },
            },
        });

        if (!dialogue) {
            throw 'Dialogue not exist';
        }

        if (dialogue.userInId === userId) {
            await this._prisma.privateDialogue.update({
                where: { id: privateDialogueId },
                data : { userInArchived: true },
            });

            return [
                [
                    [ userId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_IN,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userOut)),
                    },
                ],
                [
                    [ dialogue.userOutId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userIn)),
                    },
                ],
            ];
        } else {
            await this._prisma.privateDialogue.update({
                where: { id: privateDialogueId },
                data : { userOutArchived: true },
            });

            return [
                [
                    [ userId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_IN,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userIn)),
                    },
                ],
                [
                    [ dialogue.userInId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userOut)),
                    },
                ],
            ];
        }
    }

    async unArchive (userId: string, privateDialogueId: string): Promise<NotificationServiceResponse[]> {
        // get dialogue or throw
        // archive dialogue
        const dialogue = await this._prisma.privateDialogue.findFirstOrThrow({
            where  : {
                id: privateDialogueId,
                OR: [
                    { userInId: userId },
                    { userOutId: userId },
                ],
            },
            include: {
                userIn : { include: prismaToDomainUserInclude },
                userOut: { include: prismaToDomainUserInclude },
            },
        });

        if (!dialogue) {
            throw 'Dialogue not exist';
        }

        if (dialogue.userInId === userId) {
            await this._prisma.privateDialogue.update({
                where: { id: privateDialogueId },
                data : { userInArchived: false },
            });

            return [
                [
                    [ userId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_IN,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userOut)),
                    },
                ],
                [
                    [ dialogue.userOutId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userIn)),
                    },
                ],
            ];
        } else {
            await this._prisma.privateDialogue.update({
                where: { id: privateDialogueId },
                data : { userOutArchived: false },
            });

            return [
                [
                    [ userId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_IN,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userIn)),
                    },
                ],
                [
                    [ dialogue.userInId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userOut)),
                    },
                ],
            ];
        }
    }

    async remove (userId: string, privateDialogueId: string): Promise<NotificationServiceResponse[]> {
        // get dialogue
        const dialogue = await this._prisma.privateDialogue.findFirstOrThrow({
            where  : {
                id: privateDialogueId,
                OR: [
                    { userInId: userId },
                    { userOutId: userId },
                ],
            },
            include: {
                userIn : { include: prismaToDomainUserInclude },
                userOut: { include: prismaToDomainUserInclude },
            },
        });

        if (!dialogue) {
            throw 'Dialogue not exist';
        }
        // if other user deleted dialogue too -> remove dialogue

        if (dialogue.userInId === userId) {
            if (dialogue.userOutDeleted) {
                await this._prisma.privateDialogue.deleteMany({
                    where: { id: privateDialogueId },
                });
            } else {
                await this._prisma.privateDialogue.update({
                    where: { id: privateDialogueId },
                    data : { userInDeleted: true },
                });
            }

            return [
                [
                    [ userId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_DELETED_IN,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userOut)),
                    },
                ],
                [
                    [ dialogue.userOutId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_DELETED_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userIn)),
                    },
                ],
            ];
        }
        // else change dialogue
        else {
            if (dialogue.userInDeleted) {
                await this._prisma.privateDialogue.delete({
                    where: { id: privateDialogueId },
                });
            } else {
                await this._prisma.privateDialogue.update({
                    where: { id: privateDialogueId },
                    data : { userOutDeleted: true },
                });
            }

            return [
                [
                    [ userId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_DELETED_IN,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userIn)),
                    },
                ],
                [
                    [ dialogue.userOutId ],
                    DomainNotificationType.PRIVATE_DIALOGUE_DELETED_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(dialogue.userOut)),
                    },
                ],
            ];
        }
    }

    async updateTitle (userId: string, privateDialogueId: string, title: string): Promise<NotificationServiceResponse[]> {
        throw new Error('Method not implemented.');
    }

    async updateAvatar (userId: string, privateDialogueId: string, avatar: string): Promise<NotificationServiceResponse[]> {
        throw new Error('Method not implemented.');
    }

    private async _createConversationForUsers (userIn: DomainUser, userOut: DomainUser): Promise<NotificationServiceResponse[]> {
        const conversation = await this._prisma.privateDialogue.create({
            data: { userInId: userIn.id, userOutId: userOut.id },
        });
        return [
            [
                [ userIn.id ],
                DomainNotificationType.PRIVATE_DIALOGUE_CREATED_IN,
                {
                    dialogue: {
                        id               : conversation.id,
                        avatar           : conversation.avatar,
                        title            : conversation.title,
                        createdDate      : conversation.creationDate.getTime(),
                        meArchived       : conversation.userInArchived,
                        meDeleted        : conversation.userInDeleted,
                        companionArchived: conversation.userOutArchived,
                        companionDeleted : conversation.userOutDeleted,
                        user             : userOut,
                        messages         : [],
                    },
                },
            ],
            [
                [ userOut.id ],
                DomainNotificationType.PRIVATE_DIALOGUE_CREATED_OUT,
                {
                    dialogue: {
                        id               : conversation.id,
                        avatar           : conversation.avatar,
                        title            : conversation.title,
                        createdDate      : conversation.creationDate.getTime(),
                        meArchived       : conversation.userOutArchived,
                        meDeleted        : conversation.userOutDeleted,
                        companionArchived: conversation.userInArchived,
                        companionDeleted : conversation.userInDeleted,
                        user             : userOut,
                        messages         : [],
                    },
                },
            ],
        ];
    }
}