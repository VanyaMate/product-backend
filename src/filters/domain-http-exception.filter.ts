import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import {
    globalExceptionServiceErrorResponse,
} from '@/types/lib/globalExceptionServiceErrorResponse';
import { DomainServiceErrorException } from '@/exceptions/domain-service-error.exception';
import { serviceErrorResponse } from 'product-types';


@Catch(DomainServiceErrorException)
export class DomainHttpExceptionFilter implements ExceptionFilter {
    catch (exception: DomainServiceErrorException, host: ArgumentsHost) {
        const ctx           = host.switchToHttp();
        const response      = ctx.getResponse<Response>();
        const errorResponse = serviceErrorResponse(exception.getResponse());

        response
            .status(errorResponse.errors[0].code)
            .json(errorResponse);
    }
}