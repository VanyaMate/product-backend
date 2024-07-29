import { Module } from '@nestjs/common';
import {
    LanguageController,
} from '@/nest/modules/api/v1/language/language.controller';
import {
    LanguageService,
} from '@/nest/modules/api/v1/language/language.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';


@Module({
    controllers: [ LanguageController ],
    providers  : [ LanguageService ],
    imports    : [
        ServicesModule,
        TokenModule,
        NotificationModule,
    ],
})
export class LanguageModule {
}