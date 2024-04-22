import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';


export interface ITokensService {
    generateForUser (login: string, fingerprint: DomainFingerprint): Promise<[ string, string ]>;

    refreshTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<[ string, string ]>;

    removeTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<boolean>;

    removeAllTokensForUserByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<[ string, string ]>;
}