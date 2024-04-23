import { Module } from '@nestjs/common';
import {
    AuthorizationModule,
} from '@/nest/modules/api/v1/authorization/authorization.module';
import {
    AuthenticationModule,
} from '@/nest/modules/api/v1/authentication/authentication.module';
import { UserModule } from '@/nest/modules/api/v1/user/user.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';


@Module({
    imports: [
        AuthorizationModule,
        AuthenticationModule,
        UserModule,
        TokenModule,
        NotificationModule,
    ],
})
export class ApiV1Module {
}