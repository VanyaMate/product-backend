import { UserRefreshToken } from '@prisma/client';
import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';


export const validateRefreshTokenByFingerprint = function (fingerprint: DomainFingerprint, storeData: UserRefreshToken): boolean {
    return (
        fingerprint.device === storeData.devise &&
        fingerprint.ip === storeData.ip &&
        fingerprint.browser === storeData.browser
    );
};