import { ITokensService } from '@/domain/services/tokens/tokens-service.interface';
import {
    assertDomainRefreshTokenPayload,
    DomainRefreshTokenPayload,
    DomainTokenGenerateData, DomainTokens,
    serviceErrorResponse,
} from 'product-types';
import { PrismaClient, UserRefreshToken } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import {
    validateRefreshTokenByFingerprint,
} from '@/domain/services/tokens/validators/refresh-token-by-fingerprint.validator';
import {
    assertDomainFingerprint,
    DomainFingerprint,
} from 'product-types/dist/fingerprint/DomainFingerprint';


export class PrismaTokensService implements ITokensService {
    constructor (
        private _prisma: PrismaClient,
        private _jwtService: JwtService, // TODO: Заменить на обертку
    ) {
    }

    async generateForUser (user_id: string, fingerprint: DomainFingerprint): Promise<DomainTokens> {
        try {
            assertDomainFingerprint(fingerprint, 'fingerprint', 'DomainFingerprint');
            return await this._generateTokens({ user_id, fingerprint });
        } catch (e) {
            throw serviceErrorResponse(e, PrismaTokensService.name, 400, 'Cant generate tokens');
        }
    }

    async refreshTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<DomainTokens> {
        try {
            const userId: string = await this._useRefreshToken(refreshToken, fingerprint);
            return await this._generateTokens({ user_id: userId, fingerprint });
        } catch (e) {
            throw serviceErrorResponse(e, PrismaTokensService.name, 400, 'Cant refresh tokens');
        }
    }

    async removeTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<boolean> {
        try {
            await this._useRefreshToken(refreshToken, fingerprint);
            return true;
        } catch (e) {
            throw serviceErrorResponse(e, PrismaTokensService.name, 400, 'Cant remove refresh token');
        }
    }

    async removeAllTokensForUserByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<DomainTokens> {
        try {
            assertDomainFingerprint(fingerprint, 'fingerprint', 'DomainFingerprint');
            const refreshTokenPayload = this._jwtService.verify<DomainRefreshTokenPayload>(refreshToken);
            assertDomainRefreshTokenPayload(refreshTokenPayload, 'refreshTokenPayload', 'DomainRefreshTokenPayload');
            const refreshTokenStored = await this._prisma.userRefreshToken.findFirstOrThrow({ where: { id: refreshTokenPayload.id } });
            if (validateRefreshTokenByFingerprint(fingerprint, refreshTokenStored)) {
                this._prisma.userRefreshToken.deleteMany({ where: { user_id: refreshTokenStored.user_id } });
                return await this._generateTokens({
                    user_id: refreshTokenStored.user_id, fingerprint,
                });
            } else {
                throw serviceErrorResponse('You do not have access to this token', 'TokenService', 403, 'No access to remove tokens');
            }
        } catch (e) {
            throw serviceErrorResponse(e, PrismaTokensService.name, 400, 'Cant remove all refresh tokens');
        }
    }

    private async _useRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<string> {
        assertDomainFingerprint(fingerprint, 'fingerprint', 'DomainFingerprint');
        const refreshTokenPayload = this._jwtService.verify<DomainRefreshTokenPayload>(refreshToken);
        assertDomainRefreshTokenPayload(refreshTokenPayload, 'refreshTokenPayload', 'DomainRefreshTokenPayload');
        const refreshTokenData = await this._prisma.userRefreshToken.findFirstOrThrow({
            where: { id: refreshTokenPayload.id },
        });

        if (validateRefreshTokenByFingerprint(fingerprint, refreshTokenData)) {
            await this._prisma.userRefreshToken.delete({ where: { id: refreshTokenPayload.id } });
            return refreshTokenData.user_id;
        } else {
            throw new Error('Refresh token not valid');
        }
    }

    private async _generateTokens (data: DomainTokenGenerateData): Promise<DomainTokens> {
        const refreshTokenData: UserRefreshToken = await this._prisma.userRefreshToken.create({
            data: {
                user_id: data.user_id,
                ip     : data.fingerprint.ip,
                browser: data.fingerprint.browser,
                devise : data.fingerprint.device,
            },
        });

        const accessToken: string  = this._jwtService.sign(
            { id: refreshTokenData.id, user_id: data.user_id },
            { expiresIn: '10m' },
        );
        const refreshToken: string = this._jwtService.sign(
            { id: refreshTokenData.id },
            { expiresIn: '30d' },
        );
        return [ accessToken, refreshToken ];
    }
}