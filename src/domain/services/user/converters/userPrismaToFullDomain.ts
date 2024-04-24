import { User } from '@prisma/client';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';


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