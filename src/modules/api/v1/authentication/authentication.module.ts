import { Module } from '@nestjs/common';
import {
    AuthenticationController,
} from '@/modules/api/v1/authentication/authentication.controller';
import {
    AuthenticationService,
} from '@/modules/api/v1/authentication/authentication.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
    controllers: [
        AuthenticationController,
    ],
    providers  : [
        AuthenticationService,
    ],
    imports    : [],
})
export class AuthenticationModule {
}