import { TokenGenerateData } from '@/domain/services/tokens/types/TokenGenerateData';
import { UserRefreshToken } from '@prisma/client';


export const refreshTokenDataValidator = function (requestData: TokenGenerateData, storeData: UserRefreshToken): boolean {
    return requestData.login === storeData.user_login &&
        requestData.device === storeData.devise &&
        requestData.ip === storeData.ip &&
        requestData.browser === storeData.browser;
};