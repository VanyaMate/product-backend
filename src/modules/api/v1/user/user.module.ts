import { Module } from '@nestjs/common';
import { UserController } from '@/modules/api/v1/user/user.controller';
import { ServicesModule } from '@/modules/services/services.module';
import { UserService } from '@/modules/api/v1/user/user.service';
import { ApiV1Module } from '@/modules/api/v1/api-v1.module';
import { TokenModule } from '@/modules/api/v1/token/token.module';


@Module({
    controllers: [
        UserController,
    ],
    imports    : [
        TokenModule,
        ServicesModule,
    ],
    providers  : [
        UserService,
    ],
})
export class UserModule {
}