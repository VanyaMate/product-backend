import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
    REQUEST_ACCESS_TOKEN_HEADER, REQUEST_REFRESH_TOKEN_HEADER,
    REQUEST_USER_ID, RESPONSE_ADDITIONAL_DATA, RESPONSE_UPDATED_TOKENS,
} from '@/domain/consts/request-response';
import {
    assertDomainAccessTokenPayload,
    DomainAccessTokenPayload,
} from 'product-types/dist/token/DomainAccessTokenPayload';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import { Request } from 'express';
import { TokenService } from '@/nest/modules/api/v1/token/token.service';
import { getFingerprint } from '@/domain/lib/request/fingerprint/getFingerprint';
import { isDomainSimpleError } from 'product-types/dist/error/DomainSimpleError';
import {
    assertDomainRefreshTokenPayload,
    DomainRefreshTokenPayload,
} from 'product-types/dist/token/DomainRefreshTokenPayload';
import { DomainTokens } from 'product-types/dist/token/DomainTokens';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


@Injectable()
export class IsUserGuard implements CanActivate {
    constructor (
        private readonly _jwtService: JwtService,
        private readonly _tokensService: TokenService,
    ) {
    }

    async canActivate (context: ExecutionContext) {
        try {
            const request: Request    = context.switchToHttp().getRequest();
            const accessToken: string = request.header(REQUEST_ACCESS_TOKEN_HEADER);
            if (!accessToken) {
                throw new HttpException('No authorized user', HttpStatus.FORBIDDEN);
            }
            const accessTokenPayload = this._jwtService.verify<DomainAccessTokenPayload>(accessToken);
            assertDomainAccessTokenPayload(accessTokenPayload, 'accessTokenPayload', 'DomainAccessTokenPayload');
            request[REQUEST_USER_ID] = accessTokenPayload.user_id;

            return true;
        } catch (e) {
            try {
                if (isDomainSimpleError(e) && e.message === 'jwt expired') {
                    const request: Request     = context.switchToHttp().getRequest();
                    const refreshToken: string = request.header(REQUEST_REFRESH_TOKEN_HEADER);
                    if (refreshToken) {
                        // verify refresh token
                        const refreshTokenPayload = this._jwtService.verify<DomainRefreshTokenPayload>(refreshToken);
                        assertDomainRefreshTokenPayload(refreshTokenPayload, 'refreshTokenPayload', 'DomainRefreshTokenPayload');

                        // verify access tokens payloads
                        const accessToken: string = request.header(REQUEST_ACCESS_TOKEN_HEADER);
                        const accessTokenPayload  = this._jwtService.decode<DomainAccessTokenPayload>(accessToken);
                        assertDomainAccessTokenPayload(accessTokenPayload, 'accessTokenPayload', 'DomainAccessTokenPayload');

                        // generate new tokens
                        const tokens: DomainTokens = await this._tokensService.refreshTokensByRefreshToken(refreshToken, getFingerprint(context));

                        // set params
                        request[RESPONSE_ADDITIONAL_DATA] = { tokens };
                        request[RESPONSE_UPDATED_TOKENS]  = tokens;
                        request[REQUEST_USER_ID]          = accessTokenPayload.user_id;

                        return true;
                    }
                }
            } catch (e) {
                throw new DomainServiceErrorException(serviceErrorResponse(e, 'IsUserGuard', 403, 'Bad authorization'));
            }
            throw new DomainServiceErrorException(serviceErrorResponse(e, 'IsUserGuard', 403, 'Bad authorization'));
        }
    }
}