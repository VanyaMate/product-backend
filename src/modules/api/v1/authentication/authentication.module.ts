import { Module } from '@nestjs/common';
import {
    AuthenticationController,
} from '@/modules/api/v1/authentication/authentication.controller';
import {
    AuthenticationService,
} from '@/modules/api/v1/authentication/authentication.service';


@Module({
    controllers: [
        AuthenticationController,
    ],
    providers  : [
        AuthenticationService,
    ],
})
export class AuthenticationModule {
}