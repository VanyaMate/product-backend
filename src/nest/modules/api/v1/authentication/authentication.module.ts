import { Module } from '@nestjs/common';
import {
    AuthenticationController,
} from '@/nest/modules/api/v1/authentication/authentication.controller';
import {
    AuthenticationService,
} from '@/nest/modules/api/v1/authentication/authentication.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import { UsersModule } from '@/nest/modules/api/v1/users/users.module';


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
        UsersModule,
    ],
})
export class AuthenticationModule {
}