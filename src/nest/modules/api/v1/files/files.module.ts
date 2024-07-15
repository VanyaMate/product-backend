import { Module } from '@nestjs/common';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';
import { FilesController } from '@/nest/modules/api/v1/files/files.controller';
import { FilesService } from '@/nest/modules/api/v1/files/files.service';


@Module({
    controllers: [
        FilesController,
    ],
    providers  : [
        FilesService,
    ],
    imports    : [
        ServicesModule,
        TokenModule,
        NotificationModule,
    ],
})
export class FilesModule {
}