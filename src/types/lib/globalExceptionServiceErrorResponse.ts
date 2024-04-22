import { DomainServiceResponseError, serviceErrorResponse } from 'product-types';
import { isValidationPipeError } from '@/types/guards/validationPipeError';


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