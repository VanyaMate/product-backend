import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    IResponseTimeService,
} from '@/domain/analytics-services/response-time/response-time-service.interface';
import {
    PrismaResponseTimeService,
} from '@/domain/analytics-services/response-time/implementations/prisma/prisma-response-time.service';

// TODO: Add interface

export class AnalyticsResponseTimeService {
    private readonly _service: IResponseTimeService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaResponseTimeService(this._prisma);
    }

    async save (url: string, responseTime: number) {
        try {
            await this._service.save(url, responseTime);
        } catch (e) {
            // TODO: nothing yet
        }
    }
}