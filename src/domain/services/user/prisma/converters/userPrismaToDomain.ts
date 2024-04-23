import { User } from '@prisma/client';
import { DomainUser } from 'product-types';


export const userPrismaToDomain = function (user: User): DomainUser {
    return {
        id    : user.id,
        login : user.login,
        avatar: user.avatar,
    };
};