import { ITokensService } from '@/domain/services/tokens/tokens-service.interface';
import {
    assertDomainRefreshTokenPayload,
    assertDomainTokenGenerateData, DomainRefreshTokenPayload,
    DomainTokenGenerateData,
    serviceErrorResponse,
} from 'product-types';
import { PrismaClient, UserRefreshToken } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import {
    refreshTokenDataValidator,
} from '@/domain/services/tokens/validators/refresh-token-data.validator';


export class PrismaMongoTokensService implements ITokensService {
    constructor (
        private _prisma: PrismaClient,
        private _jwtService: JwtService, // TODO: Заменить на обертку
    ) {
    }

    async generate (data: DomainTokenGenerateData): Promise<[ string, string ]> {
        try {
            assertDomainTokenGenerateData(data, 'data', 'DomainTokenGenerateData');
            return await this._generateTokens(data);
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 403);
        }
    }

    async refresh (refreshToken: string, data: DomainTokenGenerateData): Promise<[ string, string ]> {
        try {
            await this._useRefreshToken(refreshToken, data);
            return await this._generateTokens(data);
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 403);
        }
    }

    async removeRefreshToken (refreshToken: string, data: DomainTokenGenerateData): Promise<boolean> {
        try {
            await this._useRefreshToken(refreshToken, data);
            return true;
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 403);
        }
    }

    async removeAllByUserLogin (data: DomainTokenGenerateData): Promise<[ string, string ]> {
        try {
            assertDomainTokenGenerateData(data, 'data', 'DomainTokenGenerateData');
            await this._prisma.userRefreshToken.deleteMany({ where: { user_login: data.login } });
            return await this._generateTokens(data);
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 400);
        }
    }

    private async _useRefreshToken (refreshToken: string, data: DomainTokenGenerateData): Promise<void> {
        assertDomainTokenGenerateData(data, 'data', 'DomainTokenGenerateData');
        const refreshTokenPayload = this._jwtService.verify<DomainRefreshTokenPayload>(refreshToken);
        assertDomainRefreshTokenPayload(refreshTokenPayload, 'refreshTokenPayload', 'DomainRefreshTokenPayload');
        const refreshTokenData = await this._prisma.userRefreshToken.findFirst({
            where: { id: refreshTokenPayload.id },
        });
        if (refreshTokenData && refreshTokenDataValidator(data, refreshTokenData)) {
            await this._prisma.userRefreshToken.delete({ where: { id: refreshTokenPayload.id } });
        } else {
            throw new Error('Refresh token not valid');
        }
    }

    private async _generateTokens (data: DomainTokenGenerateData): Promise<[ string, string ]> {
        const refreshTokenData: UserRefreshToken = await this._prisma.userRefreshToken.create({
            data: {
                user_login: data.login,
                ip        : data.fingerprint.ip,
                browser   : data.fingerprint.browser,
                devise    : data.fingerprint.device,
            },
        });

        const accessToken: string  = this._jwtService.sign(
            { login: data.login },
            { expiresIn: '30m' },
        );
        const refreshToken: string = this._jwtService.sign(
            { id: refreshTokenData.id },
            { expiresIn: '30d' },
        );
        return [ accessToken, refreshToken ];
    }
}