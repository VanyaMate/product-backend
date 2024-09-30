import { Injectable } from '@nestjs/common';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { IUsersService } from '@/domain/services/users/users-service.interface';
import {
    PrismaUsersService,
} from '@/domain/services/users/implementations/prisma-users.service';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class UsersService {
    private readonly _service: IUsersService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaUsersService(this._prisma);
    }

    async getUserById (id: string) {
        try {
            return await this._service.getUserById(id);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }

    async getUserByLogin (login: string) {
        try {
            return await this._service.getUserByLogin(login);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }

    async getUserFullByLogin (login: string) {
        try {
            return await this._service.getUserFullByLogin(login);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }


    async getPrivateUserFullById (userId: string) {
        try {
            return await this._service.getPrivateUserFullById(userId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }

    async getPrivateUserFullByLogin (login: string) {
        try {
            return await this._service.getPrivateUserFullByLogin(login);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }

    async getUsersByLogins (logins: string[]) {
        try {
            return await this._service.getUsersByLogins(logins);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }

    async findUserByStartLogin (loginStart: string) {
        try {
            return await this._service.findUsersByStartLogin(loginStart);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }
}