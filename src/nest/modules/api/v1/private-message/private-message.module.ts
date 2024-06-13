import { Module } from '@nestjs/common';
import {
    PrivateMessageService,
} from '@/nest/modules/api/v1/private-message/private-message.service';
import {
    PrivateMessageController,
} from '@/nest/modules/api/v1/private-message/private-message.controller';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import { ServicesModule } from '@/nest/modules/services/services.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';


@Module({
    providers  : [
        PrivateMessageService,
    ],
    controllers: [
        PrivateMessageController,
    ],
    imports    : [
        TokenModule,
        ServicesModule,
        NotificationModule,
    ],
})
export class PrivateMessageModule {
}