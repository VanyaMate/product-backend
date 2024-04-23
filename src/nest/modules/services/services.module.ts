import { Module } from '@nestjs/common';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';


@Module({
    providers: [
        PrismaService,
    ],
    exports  : [
        PrismaService,
    ],
})
export class ServicesModule {

}