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
import {
    DomainLoginDataDto,
} from '@/modules/api/v1/authentication/dto/domain-login-data.dto';
import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';
import {
    DomainRegistrationDataDto,
} from '@/modules/api/v1/authentication/dto/domain-registration-data.dto';
import { DomainLoginData, DomainRegistrationData } from 'product-types';
import { DomainServiceErrorException } from '@/exceptions/domain-service-error.exception';


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

    async login (loginData: DomainLoginData, fingerprint: DomainFingerprint) {
        try {
            return await this._service.login(loginData, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(e);
        }
    }

    async registration (registrationData: DomainRegistrationData, fingerprint: DomainFingerprint) {
        try {
            return await this._service.registration(registrationData, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(e);
        }
    }

    async refresh (refreshToken: string, fingerprint: DomainFingerprint) {
        try {
            return await this._service.refresh(refreshToken, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(e);
        }
    }
}