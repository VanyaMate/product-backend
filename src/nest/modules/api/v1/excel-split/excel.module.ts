import { Module } from '@nestjs/common';
import {
    ExcelSplitService,
} from '@/nest/modules/api/v1/excel-split/excel-split.service';
import {
    ExcelSplitController,
} from '@/nest/modules/api/v1/excel-split/excel-split.controller';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    FilesUploadModule,
} from '@/nest/modules/api/v1/files-upload/files-upload.module';


@Module({
    providers  : [ ExcelSplitService ],
    controllers: [ ExcelSplitController ],
    imports    : [
        ServicesModule,
        TokenModule,
        FilesUploadModule,
    ],
})
export class ExcelModule {

}