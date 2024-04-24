import { isValidationPipeError } from '@/domain/types/guards/validationPipeError';
import {
    DomainServiceResponseError
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    serviceErrorResponse
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


export const globalExceptionServiceErrorResponse = function (error: unknown): DomainServiceResponseError {
    if (isValidationPipeError(error)) {
        return {
            errors: [
                {
                    code    : error.statusCode,
                    target  : 'DtoValidator',
                    title   : error.error,
                    messages: typeof error.message === 'string' ? [ error.message ]
                                                                : error.message,
                },
            ],
        };
    }

    return serviceErrorResponse(error, 'globalExceptionServiceErrorResponse', 500, 'Unknown error');
};