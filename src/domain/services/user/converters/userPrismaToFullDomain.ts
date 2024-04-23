import { User } from '@prisma/client';
import { DomainUserFull } from 'product-types';


export const userPrismaToFullDomain = function (user: User): DomainUserFull {
    return {
        id      : user.id,
        login   : user.login,
        avatar  : user.avatar,
        contacts: {
            email      : user.email,
            phoneNumber: user.phoneNumber,
        },
        nameInfo: {
            firstName: user.firstName,
            lastName : user.lastName,
        },
    };
};