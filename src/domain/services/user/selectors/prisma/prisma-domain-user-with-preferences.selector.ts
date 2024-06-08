import { Prisma } from '@prisma/client';


export const prismaDomainUserWithPreferencesSelector: Pick<Prisma.UserSelect, 'id' | 'avatar' | 'login' | 'preferences'> = {
    id         : true,
    avatar     : true,
    login      : true,
    preferences: {
        select: {
            generalPage    : true,
            privateDialogue: true,
            dialogue       : true,
            friendRequest  : true,
        },
    },
};