import { DomainTokens } from 'product-types/dist/token/DomainTokens';
import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';


export interface ITokensService {
    generateForUser (login: string, fingerprint: DomainFingerprint): Promise<DomainTokens>;

    refreshTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<DomainTokens>;

    removeTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<boolean>;

    removeAllTokensForUserByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<DomainTokens>;
}