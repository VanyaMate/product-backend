import { Module } from '@nestjs/common';
import { UserController } from '@/nest/modules/api/v1/user/user.controller';
import { UserService } from '@/nest/modules/api/v1/user/user.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';


@Module({
    controllers: [ UserController ],
    providers  : [ UserService ],
    imports    : [
        ServicesModule,
        TokenModule,
        NotificationModule,
    ],
})
export class UserModule {

}