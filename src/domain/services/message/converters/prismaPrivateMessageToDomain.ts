import { PrivateMessage, User } from '@prisma/client';
import {
    DomainMessage,
    DomainMessageType,
} from 'product-types/dist/message/DomainMessage';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';
import { DomainUser } from 'product-types/dist/user/DomainUser';


export const prismaPrivateMessageToDomain = function (message: PrivateMessage, author: DomainUser): DomainMessage {
    return {
        id          : message.id,
        message     : message.message,
        type        : message.type as DomainMessageType,
        author      : author,
        redacted    : message.redacted,
        read        : message.read,
        creationDate: message.creationDate.toUTCString(),
        dialogueId  : message.privateDialogueId,
    };
};