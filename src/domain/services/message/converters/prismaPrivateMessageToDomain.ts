import { PrivateMessage, User } from '@prisma/client';
import {
    DomainMessage,
    DomainMessageType,
} from 'product-types/dist/message/DomainMessage';
import {
    userPrismaToDomain,
} from '@/domain/services/user/converters/userPrismaToDomain';


export const prismaPrivateMessageToDomain = function (message: PrivateMessage, author: User): DomainMessage {
    return {
        id          : message.id,
        message     : message.message,
        type        : message.type as DomainMessageType,
        author      : userPrismaToDomain(author),
        redacted    : message.redacted,
        creationDate: message.creationDate.toUTCString(),
        dialogueId  : message.privateDialogueId,
    };
};