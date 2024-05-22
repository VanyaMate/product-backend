import { Prisma } from '@prisma/client';


export const prismaDomainUserSelector: Pick<Prisma.UserSelect, 'id' | 'avatar' | 'login'> = {
    id    : true,
    avatar: true,
    login : true,
};