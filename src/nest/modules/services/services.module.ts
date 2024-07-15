import { Module } from '@nestjs/common';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { FileService } from '@/nest/modules/services/files/file.service';


@Module({
    providers: [
        PrismaService,
        FileService,
    ],
    exports  : [
        PrismaService,
        FileService,
    ],
})
export class ServicesModule {

}