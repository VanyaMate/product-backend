import { Module } from '@nestjs/common';
import {
    MessageController,
} from '@/nest/modules/api/v1/message/message.controller';
import { MessageService } from '@/nest/modules/api/v1/message/message.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';


@Module({
    controllers: [
        MessageController,
    ],
    providers  : [
        MessageService,
    ],
    imports    : [
        ServicesModule,
        TokenModule,
        NotificationModule,
    ],
})
export class MessageModule {
}