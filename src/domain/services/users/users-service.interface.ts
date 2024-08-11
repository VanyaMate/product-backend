import { DomainUser } from 'product-types/dist/user/DomainUser';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';


export interface IUsersService {
    getUserById (id: string): Promise<DomainUser>;

    getUserByLogin (login: string): Promise<DomainUser>;

    getUserFullByLogin (login: string): Promise<DomainUserFull>;

    getPrivateUserFullById (id: string): Promise<DomainUserFull>;

    getPrivateUserFullByLogin (login: string): Promise<DomainUserFull>;

    getUsersByLogins (logins: string[]): Promise<DomainUser[]>;

    findUsersByStartLogin (loginStart: string): Promise<DomainUser[]>;
}