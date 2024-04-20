import { ITokensService } from '@/domain/services/tokens/tokens-service.interface';
import { assertTokenGenerateData, TokenGenerateData } from '../types/TokenGenerateData';
import { serviceErrorResponse } from 'product-types';
import { PrismaClient, UserRefreshToken } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import {
    assertRefreshTokenPayload,
    RefreshTokenPayload,
} from '@/domain/services/tokens/types/RefreshTokenPayload';
import {
    refreshTokenDataValidator,
} from '@/domain/services/tokens/validators/refresh-token-data.validator';


export class PrismaMongoTokensService implements ITokensService {
    constructor (
        private _prisma: PrismaClient,
        private _jwtService: JwtService, // TODO: Заменить на обертку
    ) {
    }

    async generate (data: TokenGenerateData): Promise<[ string, string ]> {
        try {
            assertTokenGenerateData(data, 'data', 'TokenGenerateData');
            return this._generateTokens(data);
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 403);
        }
    }

    async refresh (refreshToken: string, data: TokenGenerateData): Promise<[ string, string ]> {
        try {
            await this._useRefreshToken(refreshToken, data);
            return this._generateTokens(data);
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 403);
        }
    }

    async removeRefreshToken (refreshToken: string, data: TokenGenerateData): Promise<boolean> {
        try {
            await this._useRefreshToken(refreshToken, data);
            return true;
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 403);
        }
    }

    async removeAllByUserLogin (data: TokenGenerateData): Promise<[ string, string ]> {
        try {
            assertTokenGenerateData(data, 'data', 'TokenGenerateData');
            await this._prisma.userRefreshToken.deleteMany({ where: { user_login: data.login } });
            return this._generateTokens(data);
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 400);
        }
    }

    private async _useRefreshToken (refreshToken: string, data: TokenGenerateData): Promise<void> {
        assertTokenGenerateData(data, 'data', 'TokenGenerateData');
        const refreshTokenPayload = this._jwtService.verify<RefreshTokenPayload>(refreshToken);
        assertRefreshTokenPayload(refreshTokenPayload, 'refreshTokenPayload', 'RefreshTokenPayload');
        const refreshTokenData = await this._prisma.userRefreshToken.findFirst({
            where: { id: refreshTokenPayload.id },
        });
        if (refreshTokenData && refreshTokenDataValidator(data, refreshTokenData)) {
            await this._prisma.userRefreshToken.delete({ where: { id: refreshTokenPayload.id } });
        } else {
            throw new Error('Refresh token not valid');
        }
    }

    private async _generateTokens (data: TokenGenerateData): Promise<[ string, string ]> {
        const refreshTokenData: UserRefreshToken = await this._prisma.userRefreshToken.create({
            data: {
                user_login: data.login,
                ip        : data.ip,
                browser   : data.browser,
                devise    : data.device,
            },
        });

        const accessToken: string  = this._jwtService.sign({ login: data.login }, { expiresIn: '30m' });
        const refreshToken: string = this._jwtService.sign({ id: refreshTokenData.id }, { expiresIn: '30d' });
        return [ accessToken, refreshToken ];
    }
}