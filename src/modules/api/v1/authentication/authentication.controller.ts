import { Body, Controller, Post, Req } from '@nestjs/common';
import {
    AuthenticationService,
} from '@/modules/api/v1/authentication/authentication.service';
import {
    DomainRegistrationDataDto,
} from '@/modules/api/v1/authentication/dto/domain-registration-data.dto';
import { Request } from 'express';
import { Fingerprint } from '@/decorators/finger-print.decorator';
import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';
import {
    DomainLoginDataDto,
} from '@/modules/api/v1/authentication/dto/domain-login-data.dto';
import { DomainRegistrationData } from 'product-types';
import { RefreshTokenDto } from '@/modules/api/v1/authentication/dto/refresh-token.dto';


@Controller('/api/v1/authentication')
export class AuthenticationController {
    constructor (private readonly _service: AuthenticationService) {
    }

    @Post('/login')
    public login (
        @Body() loginData: DomainLoginDataDto,
        @Fingerprint() fingerprint: DomainFingerprint,
    ) {
        return this._service.login(loginData, fingerprint);
    }

    @Post('/registration')
    public registration (
        @Body() registrationData: DomainRegistrationDataDto,
        @Fingerprint() fingerprint: DomainFingerprint,
    ) {
        return this._service.registration(registrationData, fingerprint);
    }

    @Post('/refresh')
    public refresh (
        @Body() refreshToken: RefreshTokenDto,
        @Fingerprint() fingerprint: DomainFingerprint,
    ) {
        return this._service.refresh(refreshToken.token, fingerprint);
    }
}