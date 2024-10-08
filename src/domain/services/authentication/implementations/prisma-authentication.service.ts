import { IHashService } from '@/domain/services/hash/hash-service.interface';
import {
    ITokensService,
} from '@/domain/services/tokens/tokens-service.interface';
import {
    DomainFingerprint,
} from 'product-types/dist/fingerprint/DomainFingerprint';
import {
    IAuthenticationService,
} from '@/domain/services/authentication/authentication-service.interface';
import { PrismaClient, User } from '@prisma/client';
import {
    assertDomainLoginData,
    DomainLoginData,
} from 'product-types/dist/authorization/DomainLoginData';
import {
    DomainAuthResponse,
} from 'product-types/dist/authorization/DomainAuthResponse';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import {
    assertDomainRegistrationData,
    DomainRegistrationData,
} from 'product-types/dist/authorization/DomainRegistrationData';
import {
    prismaUserToFullDomain,
} from '@/domain/services/users/converters/prismaUserToFullDomain';
import {
    prismaToDomainFullUserInclude,
} from '@/domain/services/users/include/prisma/prisma-full-user.inculde';


export class PrismaAuthenticationService implements IAuthenticationService {
    constructor (
        private readonly _prisma: PrismaClient,
        private readonly _tokensService: ITokensService,
        private readonly _hashService: IHashService,
    ) {
    }

    async login (loginData: DomainLoginData, fingerprint: DomainFingerprint): Promise<DomainAuthResponse> {
        try {
            assertDomainLoginData(loginData, 'loginData', 'DomainLoginData');

            const { login, password } = loginData;
            const user                = await this._prisma.user.findFirst({
                where  : { login },
                include: prismaToDomainFullUserInclude,
            });

            if (user) {
                const isUserPassword = await this._hashService.compare(user.password, password);
                if (isUserPassword) {
                    const tokens = await this._tokensService.generateForUser(user.id, fingerprint);
                    return {
                        tokens,
                        user: prismaUserToFullDomain({
                            ...user,
                            connections: [],
                            permissions: user.permissions,
                        }),
                    };
                }
            }

            throw new Error('User not found');
        } catch (e) {
            throw serviceErrorResponse(e, PrismaAuthenticationService.name, 403, 'Bad login');
        }
    }

    async registration (registrationData: DomainRegistrationData, fingerprint: DomainFingerprint): Promise<DomainAuthResponse> {
        try {
            assertDomainRegistrationData(registrationData, 'registrationData', 'DomainRegistrationData');
            const { login, password, email } = registrationData;
            const user                       = await this._prisma.user.findFirst({
                where: { login },
            });

            if (!user) {
                const passwordHash  = await this._hashService.hash(password);
                const newUser: User = await this._prisma.user.create({
                    data: { login, email, password: passwordHash },
                });
                const tokens        = await this._tokensService.generateForUser(newUser.id, fingerprint);

                const permissions = await this._prisma.userPermissions.create({
                    data: { userId: newUser.id },
                });

                return {
                    tokens,
                    user: prismaUserToFullDomain({
                        ...newUser,
                        connections: [],
                        permissions,
                    }),
                };
            } else {
                throw new Error('This login is already taken');
            }
        } catch (e) {
            throw serviceErrorResponse(e, PrismaAuthenticationService.name, 400, 'Bad registration');
        }
    }

    async refresh (refreshToken: string, fingerprint: DomainFingerprint): Promise<[ string, string ]> {
        try {
            return await this._tokensService.refreshTokensByRefreshToken(refreshToken, fingerprint);
        } catch (e) {
            throw serviceErrorResponse(e, PrismaAuthenticationService.name, 400, 'Bad refresh token');
        }
    }

    async logout (refreshToken: string, fingerprint: DomainFingerprint): Promise<boolean> {
        try {
            return await this._tokensService.removeTokensByRefreshToken(refreshToken, fingerprint);
        } catch (e) {
            throw serviceErrorResponse(e, PrismaAuthenticationService.name, 400, 'Bad logout');
        }
    }
}