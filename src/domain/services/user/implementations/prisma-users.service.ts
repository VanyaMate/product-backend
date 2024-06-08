import { IUserService } from '@/domain/services/user/users-service.interface';
import { PrismaClient, User } from '@prisma/client';
import {
    userPrismaToDomain,
} from '@/domain/services/user/converters/userPrismaToDomain';
import {
    userPrismaToFullDomain,
} from '@/domain/services/user/converters/userPrismaToFullDomain';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';


export class PrismaUsersService implements IUserService {
    constructor (
        private readonly _prisma: PrismaClient,
    ) {
    }

    async getUserById (id: string): Promise<DomainUser> {
        try {
            const user: User = await this._prisma.user.findFirstOrThrow({ where: { id } });
            return userPrismaToDomain(user);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async getUserByLogin (login: string): Promise<DomainUser> {
        try {
            const user: User = await this._prisma.user.findFirstOrThrow({ where: { login } });
            return userPrismaToDomain(user);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async getUserFullByLogin (login: string): Promise<DomainUserFull> {
        try {
            const user = await this._prisma.user.findFirstOrThrow({
                where  : { login },
                include: { preferences: true },
            });
            return userPrismaToFullDomain(user);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async getPrivateUserFullByLogin (login: string): Promise<DomainUserFull> {
        try {
            const user = await this._prisma.user.findFirstOrThrow({
                where  : { login },
                include: { preferences: true },
            });
            return userPrismaToFullDomain(user);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async getUsersByLogins (logins: string[]): Promise<DomainUser[]> {
        try {
            const users: User[] = await this._prisma.user.findMany({ where: { login: { in: logins } } });
            return users.map(userPrismaToDomain);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async findUsersByStartLogin (loginStart: string): Promise<DomainUser[]> {
        try {
            const users: User[] = await this._prisma.user.findMany({ where: { login: { startsWith: loginStart } } });
            return users.map(userPrismaToDomain);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }
}