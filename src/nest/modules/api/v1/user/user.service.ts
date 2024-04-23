import { Injectable } from '@nestjs/common';
import { serviceErrorResponse } from 'product-types';
import {
    userPrismaToDomain,
} from '@/domain/services/user/converters/userPrismaToDomain';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { IUserService } from '@/domain/services/user/user-service.interface';
import {
    PrismaUserService,
} from '@/domain/services/user/implementations/prisma-user.service';


@Injectable()
export class UserService {
    private readonly _service: IUserService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaUserService(this._prisma);
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
}