import { throwAssertError, TypeAssert, TypeGuard } from 'product-types';


export type RefreshTokenPayload = {
    id: string;
}

export const isRefreshTokenPayload: TypeGuard<RefreshTokenPayload> = function (data: unknown): data is RefreshTokenPayload {
    if (typeof data !== 'object') {
        return false;
    }

    if (typeof data['id'] !== 'string') {
        return false;
    }

    return true;
};

export const assertRefreshTokenPayload: TypeAssert<RefreshTokenPayload> = function (data: unknown, variableName: string, typeName: string) {
    if (!isRefreshTokenPayload(data)) {
        throwAssertError(variableName, typeName);
    }
};