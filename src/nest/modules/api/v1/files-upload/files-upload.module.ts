import { Module } from '@nestjs/common';
import { ServicesModule } from '@/nest/modules/services/services.module';
import {
    FilesUploadController,
} from '@/nest/modules/api/v1/files-upload/files-upload.controller';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';
import {
    FilesUploadService,
} from '@/nest/modules/api/v1/files-upload/files-upload.service';


@Module({
    providers  : [
        FilesUploadService,
    ],
    controllers: [
        FilesUploadController,
    ],
    imports    : [
        TokenModule,
        ServicesModule,
        NotificationModule,
    ],
    exports    : [
        FilesUploadService,
    ],
})
export class FilesUploadModule {
}