import { Prisma } from '@prisma/client';


export const prismaDomainUserWithPreferencesSelector: Pick<Prisma.UserSelect, 'id' | 'avatar' | 'login' | 'permissions'> = {
    id         : true,
    avatar     : true,
    login      : true,
    permissions: {
        select: {
            generalPage    : true,
            privateDialogue: true,
            dialogue       : true,
            friendRequest  : true,
        },
    },
};