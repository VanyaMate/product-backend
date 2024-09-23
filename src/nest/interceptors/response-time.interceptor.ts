import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import {
    AnalyticsResponseTimeService,
} from '@/nest/modules/services/analytics/AnalyticsResponseTime/AnalyticsResponseTime.service';
import { map, Observable } from 'rxjs';
import {
    DomainResponse,
    isDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { Request } from 'express';
import { REQUEST_START_TIME } from '@/nest/interceptors/consts';


export class ResponseTimeInterceptor implements NestInterceptor {
    constructor (private readonly _analyticResponse: AnalyticsResponseTimeService) {
    }

    intercept (context: ExecutionContext, next: CallHandler<any>): Observable<DomainResponse> {
        return next.handle().pipe(
            map((data) => {
                const request: Request         = context.switchToHttp().getRequest();
                const requestStartTime: number = request[REQUEST_START_TIME];
                if (requestStartTime) {
                    this._analyticResponse.save(request.route.path, Date.now() - requestStartTime);
                }
                return data;
            }),
        );
    }
}