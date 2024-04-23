import { IUserService } from '@/domain/services/user/user-service.interface';
import { PrismaClient, User } from '@prisma/client';
import { DomainUser, DomainUserFull, serviceErrorResponse } from 'product-types';
import { userPrismaToDomain } from '@/domain/services/user/converters/userPrismaToDomain';
import {
    userPrismaToFullDomain,
} from '@/domain/services/user/converters/userPrismaToFullDomain';


export class PrismaUserService implements IUserService {
    constructor (
        private readonly _prisma: PrismaClient,
    ) {
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
            const user: User = await this._prisma.user.findFirstOrThrow({ where: { login } });
            return userPrismaToFullDomain(user);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async getPrivateUserFullByLogin (login: string): Promise<DomainUserFull> {
        try {
            const user: User = await this._prisma.user.findFirstOrThrow({ where: { login } });
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
}