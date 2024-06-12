import { PrivateDialogue, User } from '@prisma/client';
import {
    DomainPrivateDialogueWithUser,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueWithUser';
import {
    userPrismaToDomain,
} from '@/domain/services/user/converters/userPrismaToDomain';


export const prismaPrivateDialogueWithUserToDomain = function (dialogue: PrivateDialogue, user: User): DomainPrivateDialogueWithUser {
    return {
        id    : dialogue.id,
        title : dialogue.title,
        avatar: dialogue.avatar,
        user  : userPrismaToDomain(user),
    };
};