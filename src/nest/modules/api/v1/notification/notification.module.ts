import { Module } from '@nestjs/common';
import {
    NotificationController,
} from '@/nest/modules/api/v1/notification/notification.controller';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';


@Module({
    controllers: [
        NotificationController,
    ],
    imports    : [
        ServicesModule,
        TokenModule,
    ],
    providers  : [
        NotificationService,
    ],
    exports    : [
        NotificationService,
    ],
})
export class NotificationModule {
}