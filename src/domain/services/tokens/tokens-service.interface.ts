import { TokenGenerateData } from '@/domain/services/tokens/types/TokenGenerateData';


export interface ITokensService {
    generate (data: TokenGenerateData): Promise<[ string, string ]>;

    refresh (refreshToken: string, data: TokenGenerateData): Promise<[ string, string ]>;

    removeRefreshToken (refreshToken: string, data: TokenGenerateData): Promise<boolean>;

    removeAllByUserLogin (data: TokenGenerateData): Promise<[ string, string ]>;
}