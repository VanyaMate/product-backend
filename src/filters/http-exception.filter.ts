import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import {
    globalExceptionServiceErrorResponse,
} from '@/types/lib/globalExceptionServiceErrorResponse';
import { DomainServiceErrorException } from '@/exceptions/domain-service-error.exception';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch (exception: HttpException, host: ArgumentsHost) {
        const ctx           = host.switchToHttp();
        const response      = ctx.getResponse<Response>();
        const errorResponse = globalExceptionServiceErrorResponse(exception.getResponse());

        response
            .status(errorResponse.errors[0].code)
            .json(errorResponse);
    }
}