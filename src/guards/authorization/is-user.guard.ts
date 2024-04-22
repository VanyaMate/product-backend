import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
    assertDomainAccessTokenPayload,
    DomainAccessTokenPayload,
} from 'product-types/dist/token/DomainAccessTokenPayload';
import {
    REQUEST_ACCESS_TOKEN_HEADER,
    REQUEST_REFRESH_TOKEN_HEADER,
    REQUEST_USER_ID, RESPONSE_ADDITIONAL_DATA,
} from '@/consts/global-names';
import {
    assertDomainRefreshTokenPayload,
    DomainRefreshTokenPayload, DomainTokens,
    isDomainSimpleError,
    serviceErrorResponse,
} from 'product-types';
import { DomainServiceErrorException } from '@/exceptions/domain-service-error.exception';
import { getFingerprint } from '@/lib/request/fingerprint/getFingerprint';
import { TokenService } from '@/modules/api/v1/token/token.service';


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
                        request[REQUEST_USER_ID]          = accessTokenPayload.user_id;

                        console.log(request[RESPONSE_ADDITIONAL_DATA]);
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