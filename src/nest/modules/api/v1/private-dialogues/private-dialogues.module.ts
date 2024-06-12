import { Module } from '@nestjs/common';
import {
    PrivateDialoguesController,
} from '@/nest/modules/api/v1/private-dialogues/private-dialogues.controller';
import {
    PrivateDialoguesService,
} from '@/nest/modules/api/v1/private-dialogues/private-dialogues.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';


@Module({
    controllers: [
        PrivateDialoguesController,
    ],
    providers  : [
        PrivateDialoguesService,
    ],
    imports    : [
        ServicesModule,
        TokenModule,
        NotificationModule,
    ],
})
export class PrivateDialoguesModule {
}