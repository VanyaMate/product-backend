import { Module } from '@nestjs/common';
import {
    DialogueController,
} from '@/nest/modules/api/v1/dialogue/dialogue.controller';
import {
    DialogueService,
} from '@/nest/modules/api/v1/dialogue/dialogue.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';


@Module({
    controllers: [
        DialogueController,
    ],
    providers  : [
        DialogueService,
    ],
    imports    : [
        ServicesModule,
        TokenModule,
    ],
})
export class DialogueModule {
}