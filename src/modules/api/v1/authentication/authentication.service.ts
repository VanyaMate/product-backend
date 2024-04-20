import { Injectable } from '@nestjs/common';
import {
    IAuthenticationService,
} from '@/domain/services/authentication/authentication-service.interface';
import {
    PrismaMongoAuthenticationService,
} from '@/domain/services/authentication/implementations/prisma-mongo-authentication.service';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class AuthenticationService {
    private _service: IAuthenticationService;

    constructor () {
        this._service = new PrismaMongoAuthenticationService(new PrismaClient());
    }

    async login () {
        try {
            return await this._service.login({
                login   : 'admin',
                password: '123',
                remember: false,
            });
        } catch (e) {
            return e;
        }
    }

    registration () {
        return this._service.registration({
            login   : 'admin',
            password: '123',
            email   : 'admin@admin.ru',
            remember: false,
        });
    }

    refresh () {
        return this._service.refresh('token');
    }
}