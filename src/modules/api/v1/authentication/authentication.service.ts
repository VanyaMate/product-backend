import { Injectable } from '@nestjs/common';
import {
    IAuthenticationService,
} from '@/domain/services/authentication/authentication-service.interface';
import {
    PrismaMongoAuthenticationService,
} from '@/domain/services/authentication/implementations/prisma-mongo-authentication.service';
import { PrismaClient } from '@prisma/client';
import {
    PrismaMongoTokensService,
} from '@/domain/services/tokens/implementations/prisma-mongo-tokens.service';
import { JwtService } from '@nestjs/jwt';
import {
    BcryptHashService,
} from '@/domain/services/hash/implementations/bcrypt-hash.service';


@Injectable()
export class AuthenticationService {
    private _service: IAuthenticationService;

    constructor (
        private readonly _jwtService: JwtService,
    ) {
        const prismaClient = new PrismaClient();

        this._service = new PrismaMongoAuthenticationService(
            prismaClient,
            new PrismaMongoTokensService(
                prismaClient,
                this._jwtService,
            ),
            new BcryptHashService(),
        );
    }

    async login () {
        try {
            return await this._service.login({
                login   : 'admin',
                password: '123',
                remember: false,
            }, {
                browser: 'chrome 123',
                ip     : '',
                device : 'Desktop',
            });
        } catch (e) {
            return e;
        }
    }

    async registration () {
        try {
            return await this._service.registration({
                login   : 'admin',
                password: '123',
                email   : 'admin@admin.ru',
                remember: false,
            }, {
                browser: 'chrome 123',
                ip     : '',
                device : 'Desktop',
            });
        } catch (e) {
            return e;
        }
    }

    refresh () {
        return this._service.refresh('token', {
            browser: 'chrome 123',
            ip     : '',
            device : 'Desktop',
        });
    }
}