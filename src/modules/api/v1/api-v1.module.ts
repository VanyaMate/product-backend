import { Module } from '@nestjs/common';
import { AuthorizationModule } from '@/modules/api/v1/authorization/authorization.module';
import { UserModule } from '@/modules/api/v1/user/user.module';
import {
    AuthenticationModule,
} from '@/modules/api/v1/authentication/authentication.module';
import { TokenModule } from '@/modules/api/v1/token/token.module';


@Module({
    imports: [
        AuthorizationModule,
        AuthenticationModule,
        UserModule,
        TokenModule,
    ],
})
export class ApiV1Module {
}