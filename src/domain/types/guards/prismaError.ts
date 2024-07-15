import { TypeGuard } from 'product-types/dist/_helpers/types/guard.types';
import { TypeAssert } from 'product-types/dist/_helpers/types/assert.types';
import {
    throwAssertError,
} from 'product-types/dist/_helpers/lib/throwAssertError';


export type PrismaError = {
    meta: {
        cause: string;
    };
}

export const isPrismaError: TypeGuard<PrismaError> = function (data: unknown): data is PrismaError {
    if (typeof data !== 'object') {
        return false;
    }

    if (
        typeof data['meta'] !== 'object' ||
        typeof data['meta']['cause'] !== 'string'
    ) {
        return false;
    }

    return true;
};

export const assertPrismaError: TypeAssert<PrismaError> = function (data: unknown, variableName: string, typeName: string) {
    if (!isPrismaError(data)) {
        throwAssertError(variableName, typeName);
    }
};