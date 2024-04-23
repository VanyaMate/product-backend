import { DomainUser, DomainUserFull } from 'product-types';


export interface IUserService {
    getUserByLogin (login: string): Promise<DomainUser>;

    getUserFullByLogin (login: string): Promise<DomainUserFull>;

    getPrivateUserFullByLogin (login: string): Promise<DomainUserFull>;

    getUsersByLogins (logins: string[]): Promise<DomainUser[]>;
}