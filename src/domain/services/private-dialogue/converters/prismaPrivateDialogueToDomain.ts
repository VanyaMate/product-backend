import { PrivateDialogue, User } from '@prisma/client';
import {
    DomainPrivateDialogue,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogue';


export const prismaPrivateDialogueToDomain = function (dialogue: PrivateDialogue): DomainPrivateDialogue {
    return {
        id    : dialogue.id,
        avatar: dialogue.avatar,
        title : dialogue.title,
    };
};