import { Module } from '@nestjs/common';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { FileService } from '@/nest/modules/services/files/file.service';
import {
    AnalyticsResponseTimeService,
} from '@/nest/modules/services/analytics/AnalyticsResponseTime/AnalyticsResponseTime.service';


@Module({
    providers: [
        PrismaService,
        FileService,
        AnalyticsResponseTimeService,
    ],
    exports  : [
        PrismaService,
        FileService,
        AnalyticsResponseTimeService,
    ],
})
export class ServicesModule {

}