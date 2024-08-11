import { Prisma } from '@prisma/client';


export const prismaToDomainUserInclude: Pick<Prisma.UserSelect, 'connections'> = {
    connections: { take: 1 },
};