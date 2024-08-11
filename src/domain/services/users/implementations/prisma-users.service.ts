import { IUsersService } from '@/domain/services/users/users-service.interface';
import { PrismaClient, User } from '@prisma/client';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';
import {
    prismaUserToFullDomain,
} from '@/domain/services/users/converters/prismaUserToFullDomain';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';
import {
    prismaToDomainFullUserInclude,
} from '@/domain/services/users/include/prisma/prisma-full-user.inculde';


export class PrismaUsersService implements IUsersService {
    constructor (
        private readonly _prisma: PrismaClient,
    ) {
    }

    async getUserById (id: string): Promise<DomainUser> {
        try {
            const user = await this._prisma.user.findFirstOrThrow({
                where  : { id },
                include: prismaToDomainUserInclude,
            });
            return prismaUserToDomain(user);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async getUserByLogin (login: string): Promise<DomainUser> {
        try {
            const user = await this._prisma.user.findFirstOrThrow({
                where  : { login },
                include: prismaToDomainUserInclude,
            });
            return prismaUserToDomain(user);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async getUserFullByLogin (login: string): Promise<DomainUserFull> {
        try {
            const user = await this._prisma.user.findFirstOrThrow({
                where  : { login },
                include: prismaToDomainFullUserInclude,
            });
            return prismaUserToFullDomain(user);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async getPrivateUserFullById (userId: string): Promise<DomainUserFull> {
        try {
            const user = await this._prisma.user.findFirstOrThrow({
                where  : { id: userId },
                include: prismaToDomainFullUserInclude,
            });
            return prismaUserToFullDomain(user);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async getPrivateUserFullByLogin (login: string): Promise<DomainUserFull> {
        try {
            const user = await this._prisma.user.findFirstOrThrow({
                where  : { login },
                include: prismaToDomainFullUserInclude,
            });
            return prismaUserToFullDomain(user);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async getUsersByLogins (logins: string[]): Promise<DomainUser[]> {
        try {
            const users = await this._prisma.user.findMany({
                where  : { login: { in: logins } },
                include: prismaToDomainUserInclude,
            });
            return users.map(prismaUserToDomain);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }

    async findUsersByStartLogin (loginStart: string): Promise<DomainUser[]> {
        try {
            const users = await this._prisma.user.findMany({
                where  : { login: { startsWith: loginStart } },
                include: prismaToDomainUserInclude,
            });
            return users.map(prismaUserToDomain);
        } catch (e) {
            throw serviceErrorResponse(e, 'PrismaUserService', 400, 'Bad request');
        }
    }
}