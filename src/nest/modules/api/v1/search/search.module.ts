import { Module } from '@nestjs/common';
import {
    SearchController,
} from '@/nest/modules/api/v1/search/search.controller';
import { SearchService } from '@/nest/modules/api/v1/search/search.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';


@Module({
    controllers: [ SearchController ],
    providers  : [ SearchService ],
    imports    : [
        ServicesModule,
        TokenModule,
    ],
})
export class SearchModule {
}