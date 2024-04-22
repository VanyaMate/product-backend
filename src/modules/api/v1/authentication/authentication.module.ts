import { Module } from '@nestjs/common';
import {
    AuthenticationController,
} from '@/modules/api/v1/authentication/authentication.controller';
import {
    AuthenticationService,
} from '@/modules/api/v1/authentication/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ServicesModule } from '@/modules/services/services.module';
import { TokenModule } from '@/modules/api/v1/token/token.module';


@Module({
    controllers: [
        AuthenticationController,
    ],
    providers  : [
        AuthenticationService,
    ],
    imports    : [
        ServicesModule,
        TokenModule,
    ],
})
export class AuthenticationModule {
}