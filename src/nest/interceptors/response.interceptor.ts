import {
    CallHandler, ExecutionContext,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import {
    DomainResponse,
    isDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { Request } from 'express';
import { RESPONSE_ADDITIONAL_DATA } from '@/domain/consts/request-response';


export class ResponseInterceptor implements NestInterceptor {
    constructor () {
    }

    intercept (context: ExecutionContext, next: CallHandler<any>): Observable<DomainResponse> {
        return next.handle().pipe(
            map((data) => isDomainResponse(data) ? data : { data }),
            map((data) => {
                const request: Request               = context.switchToHttp().getRequest();
                const additionalResponseData: object = request[RESPONSE_ADDITIONAL_DATA];

                if (additionalResponseData) {
                    return { ...data, ...additionalResponseData };
                }
                return data;
            }),
        );
    }
}