import { DomainTokenGenerateData } from 'product-types';


export interface ITokensService {
    generate (data: DomainTokenGenerateData): Promise<[ string, string ]>;

    refresh (refreshToken: string, data: DomainTokenGenerateData): Promise<[ string, string ]>;

    removeRefreshToken (refreshToken: string, data: DomainTokenGenerateData): Promise<boolean>;

    removeAllByUserLogin (data: DomainTokenGenerateData): Promise<[ string, string ]>;
}