import { Module } from '@nestjs/common';
import { CallController } from '@/nest/modules/api/v1/call/call.controller';
import { CallService } from '@/nest/modules/api/v1/call/call.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';


@Module({
    controllers: [ CallController ],
    providers  : [ CallService ],
    imports    : [
        ServicesModule,
        TokenModule,
        NotificationModule,
    ],
})
export class CallModule {
}