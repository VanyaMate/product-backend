import { DomainUser } from 'product-types/dist/user/DomainUser';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';


export interface IUserService {
    getUserByLogin (login: string): Promise<DomainUser>;

    getUserFullByLogin (login: string): Promise<DomainUserFull>;

    getPrivateUserFullByLogin (login: string): Promise<DomainUserFull>;

    getUsersByLogins (logins: string[]): Promise<DomainUser[]>;

    findUsersByStartLogin (loginStart: string): Promise<DomainUser[]>;
}