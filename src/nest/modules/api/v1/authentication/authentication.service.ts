import { Injectable } from '@nestjs/common';
import {
    IAuthenticationService,
} from '@/domain/services/authentication/authentication-service.interface';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { TokenService } from '@/nest/modules/api/v1/token/token.service';
import {
    PrismaAuthenticationService,
} from '@/domain/services/authentication/implementations/prisma-authentication.service';
import {
    BcryptHashService,
} from '@/domain/services/hash/implementations/bcrypt-hash.service';
import {
    DomainLoginData,
} from 'product-types/dist/authorization/DomainLoginData';
import {
    DomainFingerprint,
} from 'product-types/dist/fingerprint/DomainFingerprint';
import {
    DomainRegistrationData,
} from 'product-types/dist/authorization/DomainRegistrationData';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class AuthenticationService {
    private _service: IAuthenticationService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _tokenService: TokenService,
    ) {
        this._service = new PrismaAuthenticationService(
            this._prisma,
            this._tokenService,
            new BcryptHashService(),
        );
    }

    async login (loginData: DomainLoginData, fingerprint: DomainFingerprint) {
        try {
            return await this._service.login(loginData, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'AuthenticationService', 400, 'Bad login'));
        }
    }

    async registration (registrationData: DomainRegistrationData, fingerprint: DomainFingerprint) {
        try {
            return await this._service.registration(registrationData, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'AuthenticationService', 400, 'Bad registration'));
        }
    }

    async logout (refreshToken: string, fingerprint: DomainFingerprint) {
        try {
            return await this._service.logout(refreshToken, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'AuthenticationService', 400, 'Bad logout'));
        }
    }
}