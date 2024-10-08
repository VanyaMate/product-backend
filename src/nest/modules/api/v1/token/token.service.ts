import { Injectable } from '@nestjs/common';
import {
    ITokensService,
} from '@/domain/services/tokens/tokens-service.interface';
import {
    PrismaTokensService,
} from '@/domain/services/tokens/implementations/prisma-tokens.service';
import { JwtService } from '@nestjs/jwt';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    DomainFingerprint,
} from 'product-types/dist/fingerprint/DomainFingerprint';
import { DomainTokens } from 'product-types/dist/token/DomainTokens';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class TokenService implements ITokensService {
    private readonly _service: ITokensService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _jwtService: JwtService,
    ) {
        this._service = new PrismaTokensService(this._prisma, this._jwtService);
    }

    generateForUser (userId: string, fingerprint: DomainFingerprint): Promise<DomainTokens> {
        try {
            return this._service.generateForUser(userId, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'TokenService', 400, 'Bad request'));
        }
    }

    refreshTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<DomainTokens> {
        try {
            return this._service.refreshTokensByRefreshToken(refreshToken, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'TokenService', 400, 'Bad request'));
        }
    }

    removeTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<boolean> {
        try {
            return this._service.removeTokensByRefreshToken(refreshToken, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'TokenService', 400, 'Bad request'));
        }
    }

    removeAllTokensForUserByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<DomainTokens> {
        try {
            return this._service.removeAllTokensForUserByRefreshToken(refreshToken, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, 'TokenService', 400, 'Bad request'));
        }
    }
}