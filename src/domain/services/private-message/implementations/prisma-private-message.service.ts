import {
    IPrivateMessageService,
} from '@/domain/services/private-message/private-message-service.interface';
import {
    DomainMessageCreateData,
} from 'product-types/dist/message/DomainMessageCreateData';
import {
    DomainMessageUpdateData,
} from 'product-types/dist/message/DomainMessageUpdateData';
import {
    NotificationServiceResponse,
} from '../../notification/types/NotificationServiceResponse';
import { PrismaClient } from '@prisma/client';
import {
    prismaDomainUserSelector,
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    prismaPrivateMessageToDomain,
} from '@/domain/services/message/converters/prismaPrivateMessageToDomain';
import {
    prismaPrivateDialogueWithUserToDomain,
} from '@/domain/services/private-dialogue/converters/prismaPrivateDialogueWithUserToDomain';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/user/include/prisma/prisma-domain-user.include';
import {
    prismaUserToDomain,
} from '@/domain/services/user/converters/prismaUserToDomain';


export class PrismaPrivateMessageService implements IPrivateMessageService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async send (userId: string, dialogueId: string, messageCreateData: DomainMessageCreateData): Promise<NotificationServiceResponse[]> {
        // check dialogue exist
        // check user in dialogue
        // create message
        // return notifications
        const dialogue = await this._prisma.privateDialogue.findFirst({
            where: {
                id: dialogueId,
                OR: [
                    { userInId: userId },
                    { userOutId: userId },
                ],
            },
        });

        if (!dialogue) {
            throw 'Dialogue not exist';
        }

        const message = await this._prisma.privateMessage.create({
            data   : {
                privateDialogueId: dialogueId,
                authorId         : userId,
                message          : messageCreateData.message,
                type             : messageCreateData.messageType,
            },
            include: {
                author  : {
                    include: prismaToDomainUserInclude,
                },
                dialogue: {
                    include: {
                        userIn : { include: prismaToDomainUserInclude },
                        userOut: { include: prismaToDomainUserInclude },
                    },
                },
            },
        });

        const isUserIn    = message.dialogue.userIn.id === userId;
        const activeUser  = isUserIn ? message.dialogue.userIn
                                     : message.dialogue.userOut;
        const passiveUser = isUserIn ? message.dialogue.userOut
                                     : message.dialogue.userIn;

        return [
            [
                [ userId ],
                DomainNotificationType.PRIVATE_MESSAGE_IN,
                {
                    dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(passiveUser)),
                    message : prismaPrivateMessageToDomain(message, prismaUserToDomain(activeUser)),
                },
            ],
            [
                [ passiveUser.id ],
                DomainNotificationType.PRIVATE_MESSAGE_OUT,
                {
                    dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(activeUser)),
                    message : prismaPrivateMessageToDomain(message, prismaUserToDomain(activeUser)),
                },
            ],
        ];
    }

    async redact (userId: string, messageId: string, messageUpdateData: DomainMessageUpdateData): Promise<NotificationServiceResponse[]> {
        // check message exist
        // check message author is user
        // update message
        // check if out notification need
        // return notifications
        const previousMessage = await this._prisma.privateMessage.findFirst({
            where: {
                id      : messageId,
                authorId: userId,
            },
        });

        if (!previousMessage) {
            throw 'Message not exist';
        }

        const newMessage = await this._prisma.privateMessage.update({
            where  : {
                id: messageId,
            },
            data   : {
                message    : messageUpdateData.message,
                type       : messageUpdateData.messageType,
                redacted   : true,
                read       : false,
                updatedDate: new Date(),
            },
            include: {
                author  : {
                    include: prismaToDomainUserInclude,
                },
                dialogue: {
                    include: {
                        userIn : { include: prismaToDomainUserInclude },
                        userOut: { include: prismaToDomainUserInclude },
                    },
                },
            },
        });

        const isUserIn    = newMessage.dialogue.userIn.id === userId;
        const activeUser  = isUserIn ? newMessage.dialogue.userIn
                                     : newMessage.dialogue.userOut;
        const passiveUser = isUserIn ? newMessage.dialogue.userOut
                                     : newMessage.dialogue.userIn;


        const notifications: Array<NotificationServiceResponse> = [
            [
                [ userId ],
                DomainNotificationType.PRIVATE_MESSAGE_REDACTED_IN,
                {
                    dialogue       : prismaPrivateDialogueWithUserToDomain(newMessage.dialogue, prismaUserToDomain(passiveUser)),
                    previousMessage: prismaPrivateMessageToDomain(previousMessage, prismaUserToDomain(newMessage.author)),
                    newMessage     : prismaPrivateMessageToDomain(newMessage, prismaUserToDomain(newMessage.author)),
                },
            ],
        ];

        if (newMessage.dialogue.userInId === passiveUser.id) {
            if (!newMessage.dialogue.userInDeleted) {
                notifications.push([
                    [ passiveUser.id ],
                    DomainNotificationType.PRIVATE_MESSAGE_REDACTED_OUT,
                    {
                        dialogue       : prismaPrivateDialogueWithUserToDomain(newMessage.dialogue, prismaUserToDomain(activeUser)),
                        previousMessage: prismaPrivateMessageToDomain(previousMessage, prismaUserToDomain(newMessage.author)),
                        newMessage     : prismaPrivateMessageToDomain(newMessage, prismaUserToDomain(newMessage.author)),
                    },
                ]);
            }
        } else {
            if (!newMessage.dialogue.userOutDeleted) {
                notifications.push([
                    [ passiveUser.id ],
                    DomainNotificationType.PRIVATE_MESSAGE_REDACTED_OUT,
                    {
                        dialogue       : prismaPrivateDialogueWithUserToDomain(newMessage.dialogue, prismaUserToDomain(activeUser)),
                        previousMessage: prismaPrivateMessageToDomain(previousMessage, prismaUserToDomain(newMessage.author)),
                        newMessage     : prismaPrivateMessageToDomain(newMessage, prismaUserToDomain(newMessage.author)),
                    },
                ]);
            }
        }

        return notifications;
    }

    async remove (userId: string, messageId: string): Promise<NotificationServiceResponse[]> {
        // check message exist
        // check message author is user
        // remove message
        // check if out notification need
        // return notifications
        const message = await this._prisma.privateMessage.findFirst({
            where: {
                id      : messageId,
                authorId: userId,
            },
        });

        if (!message) {
            throw 'Message not exist';
        }

        const removedMessage = await this._prisma.privateMessage.delete({
            where  : {
                id: messageId,
            },
            include: {
                author  : {
                    include: prismaToDomainUserInclude,
                },
                dialogue: {
                    include: {
                        userIn : { include: prismaToDomainUserInclude },
                        userOut: { include: prismaToDomainUserInclude },
                    },
                },
            },
        });

        const isUserIn    = removedMessage.dialogue.userIn.id === userId;
        const activeUser  = isUserIn ? removedMessage.dialogue.userIn
                                     : removedMessage.dialogue.userOut;
        const passiveUser = isUserIn ? removedMessage.dialogue.userOut
                                     : removedMessage.dialogue.userIn;

        const notifications: Array<NotificationServiceResponse> = [
            [
                [ userId ],
                DomainNotificationType.PRIVATE_MESSAGE_DELETED_IN,
                {
                    dialogue: prismaPrivateDialogueWithUserToDomain(removedMessage.dialogue, prismaUserToDomain(passiveUser)),
                    message : prismaPrivateMessageToDomain(removedMessage, prismaUserToDomain(removedMessage.author)),
                },
            ],
        ];

        if (removedMessage.dialogue.userInId === passiveUser.id) {
            if (!removedMessage.dialogue.userInDeleted) {
                notifications.push([
                    [ passiveUser.id ],
                    DomainNotificationType.PRIVATE_MESSAGE_DELETED_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(removedMessage.dialogue, prismaUserToDomain(activeUser)),
                        message : prismaPrivateMessageToDomain(removedMessage, prismaUserToDomain(removedMessage.author)),
                    },
                ]);
            }
        } else {
            if (!removedMessage.dialogue.userOutDeleted) {
                notifications.push([
                    [ passiveUser.id ],
                    DomainNotificationType.PRIVATE_MESSAGE_DELETED_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(removedMessage.dialogue, prismaUserToDomain(activeUser)),
                        message : prismaPrivateMessageToDomain(removedMessage, prismaUserToDomain(removedMessage.author)),
                    },
                ]);
            }
        }

        return notifications;
    }

    async read (userId: string, messageId: string): Promise<NotificationServiceResponse[]> {
        // check message exist
        // check message author is user
        // update message status
        // check if out notification need
        // return notifications
        const message = await this._prisma.privateMessage.findFirst({
            where  : { id: messageId },
            include: {
                dialogue: {
                    include: {
                        userIn : true,
                        userOut: true,
                    },
                },
            },
        });

        if (!message || message.authorId === userId) {
            throw 'Message not exist';
        }

        if (!(message.dialogue.userIn.id === userId) && !(message.dialogue.userOut.id === userId)) {
            throw 'Message not exist';
        }

        const removedMessage = await this._prisma.privateMessage.update({
            where  : {
                id: messageId,
            },
            data   : {
                read: true,
            },
            include: {
                author  : {
                    include: prismaToDomainUserInclude,
                },
                dialogue: {
                    include: {
                        userIn : { include: prismaToDomainUserInclude },
                        userOut: { include: prismaToDomainUserInclude },
                    },
                },
            },
        });

        const isUserIn    = removedMessage.dialogue.userIn.id === userId;
        const activeUser  = isUserIn ? removedMessage.dialogue.userIn
                                     : removedMessage.dialogue.userOut;
        const passiveUser = isUserIn ? removedMessage.dialogue.userOut
                                     : removedMessage.dialogue.userIn;

        const notifications: Array<NotificationServiceResponse> = [
            [
                [ userId ],
                DomainNotificationType.PRIVATE_MESSAGE_READ_IN,
                {
                    dialogue: prismaPrivateDialogueWithUserToDomain(removedMessage.dialogue, prismaUserToDomain(passiveUser)),
                    message : prismaPrivateMessageToDomain(removedMessage, prismaUserToDomain(removedMessage.author)),
                },
            ],
        ];

        if (removedMessage.dialogue.userInId === passiveUser.id) {
            if (!removedMessage.dialogue.userInDeleted) {
                notifications.push([
                    [ passiveUser.id ],
                    DomainNotificationType.PRIVATE_MESSAGE_READ_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(removedMessage.dialogue, prismaUserToDomain(activeUser)),
                        message : prismaPrivateMessageToDomain(removedMessage, prismaUserToDomain(removedMessage.author)),
                    },
                ]);
            }
        } else {
            if (!removedMessage.dialogue.userOutDeleted) {
                notifications.push([
                    [ passiveUser.id ],
                    DomainNotificationType.PRIVATE_MESSAGE_READ_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(removedMessage.dialogue, prismaUserToDomain(activeUser)),
                        message : prismaPrivateMessageToDomain(removedMessage, prismaUserToDomain(removedMessage.author)),
                    },
                ]);
            }
        }

        return notifications;
    }

    async readAll (userId: string, dialogueId: string): Promise<NotificationServiceResponse[]> {
        // check user in dialogue
        // update all messages (not from user) in dialogue as read
        // return notifications
        const dialogue = await this._prisma.privateDialogue.findFirst({
            where  : {
                id: dialogueId,
                OR: [
                    { userOutId: userId },
                    { userInId: userId },
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

        await this._prisma.privateMessage.updateMany({
            where: {
                privateDialogueId: dialogue.id,
                authorId         : {
                    not: userId,
                },
            },
            data : {
                read: true,
            },
        });

        const isUserIn    = dialogue.userIn.id === userId;
        const activeUser  = isUserIn ? dialogue.userIn
                                     : dialogue.userOut;
        const passiveUser = isUserIn ? dialogue.userOut
                                     : dialogue.userIn;

        const notifications: Array<NotificationServiceResponse> = [
            [
                [ userId ],
                DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_IN,
                {
                    dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(passiveUser)),
                },
            ],
        ];

        if (dialogue.userInId === passiveUser.id) {
            if (!dialogue.userInDeleted) {
                notifications.push([
                    [ passiveUser.id ],
                    DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(activeUser)),
                    },
                ]);
            }
        } else {
            if (!dialogue.userOutDeleted) {
                notifications.push([
                    [ passiveUser.id ],
                    DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_OUT,
                    {
                        dialogue: prismaPrivateDialogueWithUserToDomain(dialogue, prismaUserToDomain(activeUser)),
                    },
                ]);
            }
        }

        return notifications;
    }
}