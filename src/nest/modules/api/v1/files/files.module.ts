import { Module } from '@nestjs/common';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { FilesController } from '@/nest/modules/api/v1/files/files.controller';


@Module({
    controllers: [
        FilesController,
    ],
    imports    : [
        ServicesModule,
    ],
})
export class FilesModule {
}