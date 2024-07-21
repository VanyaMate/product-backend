import { Prisma } from '@prisma/client';


export const prismaToDomainFullUserInclude: Pick<Prisma.UserSelect, 'connections' | 'permissions'> = {
    connections: { take: 1 },
    permissions: true,
};