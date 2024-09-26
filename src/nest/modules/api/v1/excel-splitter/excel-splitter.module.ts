import { Module } from '@nestjs/common';
import {
    ExcelSplitterService,
} from '@/nest/modules/api/v1/excel-splitter/excel-splitter.service';
import {
    ExcelSplitterController,
} from '@/nest/modules/api/v1/excel-splitter/excel-splitter.controller';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';


@Module({
    providers  : [ ExcelSplitterService ],
    controllers: [ ExcelSplitterController ],
    imports    : [
        ServicesModule,
        TokenModule,
    ],
})
export class ExcelSplitterModule {

}