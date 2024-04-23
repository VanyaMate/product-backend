import { Module } from '@nestjs/common';
import { UserController } from '@/nest/modules/api/v1/user/user.controller';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { UserService } from '@/nest/modules/api/v1/user/user.service';


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