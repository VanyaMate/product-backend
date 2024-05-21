import { Injectable } from '@nestjs/common';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { IUserService } from '@/domain/services/user/users-service.interface';
import {
    PrismaUsersService,
} from '@/domain/services/user/implementations/prisma-users.service';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


@Injectable()
export class UsersService {
    private readonly _service: IUserService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaUsersService(this._prisma);
    }

    async getUserByLogin (login: string) {
        try {
            return await this._service.getUserByLogin(login);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }

    async getUserFullByLogin (login: string) {
        try {
            return await this._service.getUserFullByLogin(login);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }

    async getPrivateUserFullByLogin (login: string) {
        try {
            return await this._service.getPrivateUserFullByLogin(login);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }

    async getUsersByLogins (logins: string[]) {
        try {
            return await this._service.getUsersByLogins(logins);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }

    async findUserByStartLogin (loginStart: string) {
        try {
            return await this._service.findUsersByStartLogin(loginStart);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, `UserService`, 400, 'Bad request'));
        }
    }
}