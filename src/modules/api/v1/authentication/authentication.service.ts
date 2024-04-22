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
import { TokenService } from '@/modules/api/v1/token/token.service';
import { PrismaService } from '@/modules/services/prisma/prisma.service';


@Injectable()
export class AuthenticationService {
    private _service: IAuthenticationService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _tokenService: TokenService,
    ) {
        this._service = new PrismaMongoAuthenticationService(
            this._prisma,
            this._tokenService,
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