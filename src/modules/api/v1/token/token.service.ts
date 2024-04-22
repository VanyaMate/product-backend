import { Injectable } from '@nestjs/common';
import { ITokensService } from '@/domain/services/tokens/tokens-service.interface';
import { DomainFingerprint, DomainTokens, serviceErrorResponse } from 'product-types';
import { PrismaService } from '@/modules/services/prisma/prisma.service';
import {
    PrismaMongoTokensService,
} from '@/domain/services/tokens/implementations/prisma-mongo-tokens.service';
import { JwtService } from '@nestjs/jwt';
import { DomainServiceErrorException } from '@/exceptions/domain-service-error.exception';


@Injectable()
export class TokenService implements ITokensService {
    private readonly _service: ITokensService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _jwtService: JwtService,
    ) {
        this._service = new PrismaMongoTokensService(this._prisma, this._jwtService);
    }

    generateForUser (login: string, fingerprint: DomainFingerprint): Promise<DomainTokens> {
        try {
            return this._service.generateForUser(login, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'TokenService', 400, 'Bad request'));
        }
    }

    refreshTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<DomainTokens> {
        try {
            return this._service.refreshTokensByRefreshToken(refreshToken, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'TokenService', 400, 'Bad request'));
        }
    }

    removeTokensByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<boolean> {
        try {
            return this._service.removeTokensByRefreshToken(refreshToken, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'TokenService', 400, 'Bad request'));
        }
    }

    removeAllTokensForUserByRefreshToken (refreshToken: string, fingerprint: DomainFingerprint): Promise<DomainTokens> {
        try {
            return this._service.removeAllTokensForUserByRefreshToken(refreshToken, fingerprint);
        } catch (e) {
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'TokenService', 400, 'Bad request'));
        }
    }
}