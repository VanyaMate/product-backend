import { Module } from '@nestjs/common';
import {
    AuthorizationModule,
} from '@/nest/modules/api/v1/authorization/authorization.module';
import {
    AuthenticationModule,
} from '@/nest/modules/api/v1/authentication/authentication.module';
import { UsersModule } from '@/nest/modules/api/v1/users/users.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';


@Module({
    imports: [
        AuthorizationModule,
        AuthenticationModule,
        UsersModule,
        TokenModule,
        NotificationModule,
    ],
})
export class ApiV1Module {
}