import { Module } from '@nestjs/common';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { FilesService } from '@/nest/modules/services/files/files.service';


@Module({
    providers: [
        PrismaService,
        FilesService,
    ],
    exports  : [
        PrismaService,
        FilesService,
    ],
})
export class ServicesModule {

}