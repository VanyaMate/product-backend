import { User } from '@prisma/client';
import {
    DomainUserContactsInfo,
} from 'product-types/dist/user/DomainUserContactsInfo';


export const prismaUserContactToDomain = function (user: User): DomainUserContactsInfo {
    return {
        email      : user.email,
        phoneNumber: user.phoneNumber,
    };
};