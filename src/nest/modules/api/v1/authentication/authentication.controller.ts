import { Body, Controller, Post } from '@nestjs/common';
import { Fingerprint } from '@/nest/decorators/finger-print.decorator';
import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';
import {
    AuthenticationService
} from '@/nest/modules/api/v1/authentication/authentication.service';
import {
    DomainLoginDataDto
} from '@/nest/modules/api/v1/authentication/dto/domain-login-data.dto';
import {
    DomainRegistrationDataDto
} from '@/nest/modules/api/v1/authentication/dto/domain-registration-data.dto';
import {
    RefreshTokenDto
} from '@/nest/modules/api/v1/authentication/dto/refresh-token.dto';


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