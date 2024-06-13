import { PrivateDialogue } from '@prisma/client';
import {
    DomainPrivateDialogueWithUser,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueWithUser';
import { DomainUser } from 'product-types/dist/user/DomainUser';


export const prismaPrivateDialogueWithUserToDomain = function (dialogue: PrivateDialogue, user: DomainUser): DomainPrivateDialogueWithUser {
    return {
        id    : dialogue.id,
        title : dialogue.title,
        avatar: dialogue.avatar,
        user  : user,
    };
};