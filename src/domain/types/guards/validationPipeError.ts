import { TypeGuard } from "product-types/dist/_helpers/types/guard.types";
import { TypeAssert } from 'product-types/dist/_helpers/types/assert.types';
import { throwAssertError } from 'product-types/dist/_helpers/lib/throwAssertError';

export type ValidationPipeError = {
    statusCode: number;
    error: string;
    message: string | string[];
}

export const isValidationPipeError: TypeGuard<ValidationPipeError> = function (data: unknown): data is ValidationPipeError {
    if (typeof data !== 'object') {
        return false;
    }

    if (
        typeof data['statusCode'] !== 'number' ||
        typeof data['error'] !== 'string' ||
        !(
            typeof data['message'] === 'string' ||
            (
                Array.isArray(data['message']) &&
                data['message'].every((message) => typeof message === 'string')
            )
        )
    ) {
        return false;
    }

    return true;
};

export const assertValidationPipeError: TypeAssert<ValidationPipeError> = function (data: unknown, variableName: string, typeName: string) {
    if (!isValidationPipeError(data)) {
        throwAssertError(variableName, typeName);
    }
};