import {
    isValidationPipeError,
} from '@/domain/types/guards/validationPipeError';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import { isPrismaError } from '@/domain/types/guards/prismaError';


export const globalExceptionServiceErrorResponse = function (error: unknown, target: string, code: number, title: string): DomainServiceResponseError {
    if (isValidationPipeError(error)) {
        return {
            errors: [
                {
                    code    : error.statusCode,
                    target  : 'DtoValidator',
                    title   : error.error,
                    messages: typeof error.message === 'string'
                              ? [ error.message ]
                              : error.message,
                },
            ],
        };
    }

    if (isPrismaError(error)) {
        return {
            errors: [
                {
                    code    : code,
                    target  : target,
                    title   : title,
                    messages: [ error.meta.cause ],
                },
            ],
        };
    }

    return serviceErrorResponse(error, target, code, title);
};