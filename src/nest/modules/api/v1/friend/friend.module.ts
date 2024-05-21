import { Module } from '@nestjs/common';
import {
    FriendController,
} from '@/nest/modules/api/v1/friend/friend.controller';
import { FriendService } from '@/nest/modules/api/v1/friend/friend.service';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import { ServicesModule } from '@/nest/modules/services/services.module';


@Module({
    controllers: [ FriendController ],
    providers  : [ FriendService ],
    imports    : [
        TokenModule,
        ServicesModule,
    ],
})
export class FriendModule {

}