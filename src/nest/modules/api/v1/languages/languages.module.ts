import { Module } from '@nestjs/common';
import {
    LanguagesController,
} from '@/nest/modules/api/v1/languages/languages.controller';
import {
    LanguagesService,
} from '@/nest/modules/api/v1/languages/languages.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';


@Module({
    controllers: [ LanguagesController ],
    providers  : [ LanguagesService ],
    imports    : [
        ServicesModule,
        TokenModule,
    ],
})
export class LanguagesModule {
}