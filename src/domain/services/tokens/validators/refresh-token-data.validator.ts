import { UserRefreshToken } from '@prisma/client';
import { DomainTokenGenerateData } from 'product-types';


export const refreshTokenDataValidator = function (requestData: DomainTokenGenerateData, storeData: UserRefreshToken): boolean {
    return requestData.login === storeData.user_login &&
        requestData.fingerprint.device === storeData.devise &&
        requestData.fingerprint.ip === storeData.ip &&
        requestData.fingerprint.browser === storeData.browser;
};