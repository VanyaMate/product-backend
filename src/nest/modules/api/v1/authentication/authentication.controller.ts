import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Fingerprint } from '@/nest/decorators/finger-print.decorator';
import {
    DomainFingerprint,
} from 'product-types/dist/fingerprint/DomainFingerprint';
import {
    AuthenticationService,
} from '@/nest/modules/api/v1/authentication/authentication.service';
import {
    DomainLoginDataDto,
} from '@/nest/modules/api/v1/authentication/dto/domain-login-data.dto';
import {
    DomainRegistrationDataDto,
} from '@/nest/modules/api/v1/authentication/dto/domain-registration-data.dto';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { Request } from 'express';
import { UsersService } from '@/nest/modules/api/v1/users/users.service';
import {
    REQUEST_ACCESS_TOKEN_HEADER,
    REQUEST_USER_ID,
} from '@/domain/consts/request-response';


@Controller('/api/v1/authentication')
export class AuthenticationController {
    constructor (
        private readonly _service: AuthenticationService,
        private readonly _usersService: UsersService,
    ) {
    }

    @Get()
    @UseGuards(IsUserGuard)
    public authorizeByTokens (
        @Req() req: Request,
    ) {
        return this._usersService.getUserById(req[REQUEST_USER_ID]);
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

    @Post('/logout')
    public logout (
        @Req() req: Request,
        @Fingerprint() fingerprint: DomainFingerprint,
    ) {
        return this._service.logout(req.header(REQUEST_ACCESS_TOKEN_HEADER), fingerprint);
    }
}