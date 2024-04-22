import { Module } from '@nestjs/common';
import { PrismaService } from '@/modules/services/prisma/prisma.service';


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