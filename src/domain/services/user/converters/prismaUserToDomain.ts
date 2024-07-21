import { Connection, User } from '@prisma/client';
import { DomainUser } from 'product-types/dist/user/DomainUser';


export const prismaUserToDomain = function (user: User & {
    connections: Connection[]
}): DomainUser {
    return {
        id    : user.id,
        login : user.login,
        avatar: user.avatar,
        online: !!user.connections.length,
    };
};