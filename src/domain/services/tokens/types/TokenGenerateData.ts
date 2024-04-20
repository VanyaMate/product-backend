import { throwAssertError, TypeAssert, TypeGuard } from 'product-types';


export type TokenGenerateData = {
    ip: string;
    login: string;
    browser: string;
    device: string;
}

export const isTokenGenerateData: TypeGuard<TokenGenerateData> = function (data: unknown): data is TokenGenerateData {
    if (typeof data !== 'object') {
        return false;
    }

    if (
        typeof data['ip'] !== 'string' ||
        typeof data['browser'] !== 'string' ||
        typeof data['device'] !== 'string' ||
        typeof data['login'] !== 'string'
    ) {
        return false;
    }

    return true;
};

export const assertTokenGenerateData: TypeAssert<TokenGenerateData> = function (data: unknown, variableName: string, typeName: string) {
    if (!isTokenGenerateData(data)) {
        throwAssertError(variableName, typeName);
    }
};