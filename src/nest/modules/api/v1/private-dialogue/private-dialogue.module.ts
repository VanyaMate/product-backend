import { Module } from '@nestjs/common';
import {
    PrivateDialogueController,
} from '@/nest/modules/api/v1/private-dialogue/private-dialogue.controller';
import {
    PrivateDialogueService,
} from '@/nest/modules/api/v1/private-dialogue/private-dialogue.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';


@Module({
    controllers: [
        PrivateDialogueController,
    ],
    providers  : [
        PrivateDialogueService,
    ],
    imports    : [
        ServicesModule,
        TokenModule,
        NotificationModule,
    ],
})
export class PrivateDialogueModule {
}