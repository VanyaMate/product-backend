import { Module } from '@nestjs/common';
import { UsersController } from '@/nest/modules/api/v1/users/users.controller';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { UsersService } from '@/nest/modules/api/v1/users/users.service';


@Module({
    controllers: [
        UsersController,
    ],
    imports    : [
        TokenModule,
        ServicesModule,
    ],
    providers  : [
        UsersService,
    ],
    exports    : [
        UsersService,
    ],
})
export class UsersModule {
}