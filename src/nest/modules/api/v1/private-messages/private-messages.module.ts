import { Module } from '@nestjs/common';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import { ServicesModule } from '@/nest/modules/services/services.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';
import {
    PrivateMessagesService,
} from '@/nest/modules/api/v1/private-messages/private-messages.service';
import {
    PrivateMessagesController,
} from '@/nest/modules/api/v1/private-messages/private-messages.controller';


@Module({
    providers  : [
        PrivateMessagesService,
    ],
    controllers: [
        PrivateMessagesController,
    ],
    imports    : [
        TokenModule,
        ServicesModule,
        NotificationModule,
    ],
})
export class PrivateMessagesModule {
}