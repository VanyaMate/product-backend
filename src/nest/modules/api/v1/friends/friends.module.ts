import { Module } from '@nestjs/common';
import {
    FriendsController,
} from '@/nest/modules/api/v1/friends/friends.controller';
import { FriendsService } from '@/nest/modules/api/v1/friends/friends.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';


@Module({
    controllers: [ FriendsController ],
    providers  : [ FriendsService ],
    imports    : [
        ServicesModule,
        TokenModule,
    ],
})
export class FriendsModule {

}