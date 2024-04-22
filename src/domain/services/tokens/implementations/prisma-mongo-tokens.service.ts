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
import {
    assertDomainFingerprint,
    DomainFingerprint,
} from 'product-types/dist/fingerprint/DomainFingerprint';


export class PrismaMongoTokensService implements ITokensService {
    constructor (
        private _prisma: PrismaClient,
        private _jwtService: JwtService, // TODO: Заменить на обертку
    ) {
    }

    async generateForUser (login: string, fingerprint: DomainFingerprint): Promise<[ string, string ]> {
        try {
            assertDomainFingerprint(fingerprint, 'fingerprint', 'DomainFingerprint');
            return await this._generateTokens({ login, fingerprint });
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 400, 'Cant generate tokens');
        }
    }

    async refreshTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<[ string, string ]> {
        try {
            await this._useRefreshToken(refreshToken, fingerprint);
            const refreshTokenPayload = this._jwtService.verify<DomainRefreshTokenPayload>(refreshToken);
            assertDomainRefreshTokenPayload(refreshTokenPayload, 'refreshTokenPayload', 'DomainRefreshTokenPayload');
            return await this._generateTokens({
                login: refreshTokenPayload.login, fingerprint,
            });
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 400, 'Cant refresh tokens');
        }
    }

    async removeTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<boolean> {
        try {
            await this._useRefreshToken(refreshToken, fingerprint);
            return true;
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 400, 'Cant remove refresh token');
        }
    }

    async removeAllTokensForUserByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<[ string, string ]> {
        try {
            assertDomainFingerprint(fingerprint, 'fingerprint', 'DomainFingerprint');
            const refreshTokenPayload = this._jwtService.verify<DomainRefreshTokenPayload>(refreshToken);
            assertDomainRefreshTokenPayload(refreshTokenPayload, 'refreshTokenPayload', 'DomainRefreshTokenPayload');
            await this._prisma.userRefreshToken.deleteMany({ where: { user_login: refreshTokenPayload.login } });
            return await this._generateTokens({
                login: refreshTokenPayload.login, fingerprint,
            });
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoTokensService.name, 400, 'Cant remove all refresh tokens');
        }
    }

    private async _useRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<void> {
        assertDomainFingerprint(fingerprint, 'fingerprint', 'DomainFingerprint');
        const refreshTokenPayload = this._jwtService.verify<DomainRefreshTokenPayload>(refreshToken);
        assertDomainRefreshTokenPayload(refreshTokenPayload, 'refreshTokenPayload', 'DomainRefreshTokenPayload');
        const refreshTokenData = await this._prisma.userRefreshToken.findFirst({
            where: { id: refreshTokenPayload.id },
        });

        if (
            refreshTokenData &&
            refreshTokenDataValidator({
                login: refreshTokenPayload.login, fingerprint,
            }, refreshTokenData)
        ) {
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
            { id: refreshTokenData.id, login: data.login },
            { expiresIn: '30m' },
        );
        const refreshToken: string = this._jwtService.sign(
            { id: refreshTokenData.id, login: data.login },
            { expiresIn: '30d' },
        );
        return [ accessToken, refreshToken ];
    }
}