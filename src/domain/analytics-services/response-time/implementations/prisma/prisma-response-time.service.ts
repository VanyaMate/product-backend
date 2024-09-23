import {
    IResponseTimeService,
} from '@/domain/analytics-services/response-time/response-time-service.interface';
import { PrismaClient } from '@prisma/client';


export class PrismaResponseTimeService implements IResponseTimeService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async save (url: string, responseTime: number): Promise<void> {
        await this._prisma.analyticsResponseTime.create({
            data: {
                url,
                responseTime,
                rejected: false,
            },
        });
    }
}