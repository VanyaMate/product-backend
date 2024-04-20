import { Controller, Get, Post } from '@nestjs/common';
import {
    AuthenticationService,
} from '@/modules/api/v1/authentication/authentication.service';


@Controller('/api/v1/authentication')
export class AuthenticationController {
    constructor (private readonly _service: AuthenticationService) {
    }

    @Get('/login')
    public login () {
        return this._service.login();
    }

    @Post('/registration')
    public registration () {

    }

    @Post('/refresh')
    public refresh () {

    }
}