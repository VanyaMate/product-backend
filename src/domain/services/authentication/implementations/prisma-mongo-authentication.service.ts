import { IAuthenticationService } from '../authentication-service.interface';
import { PrismaClient, User } from '@prisma/client';
import {
    assertDomainLoginData, assertDomainRegistrationData,
    DomainAuthResponse,
    DomainLoginData,
    DomainRegistrationData, serviceErrorResponse,
} from 'product-types';
import { IHashService } from '@/domain/services/hash/hash-service.interface';
import { ITokensService } from '@/domain/services/tokens/tokens-service.interface';
import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';


export class PrismaMongoAuthenticationService implements IAuthenticationService {
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
            const user: User          = await this._prisma.user.findFirst({ where: { login } });

            if (user) {
                const isUserPassword = await this._hashService.compare(user.password, password);
                if (isUserPassword) {
                    const tokens = await this._tokensService.generate({
                        login, fingerprint,
                    });
                    return {
                        tokens,
                        user: {
                            id    : user.id,
                            login : user.login,
                            avatar: user.avatar,
                        },
                    };
                }
            } else {
                throw new Error('User not found');
            }
        } catch (e) {
            console.log(e);
            throw serviceErrorResponse(e, PrismaMongoAuthenticationService.name, 403);
        }
    }

    async registration (registrationData: DomainRegistrationData, fingerprint: DomainFingerprint): Promise<DomainAuthResponse> {
        try {
            assertDomainRegistrationData(registrationData, 'registrationData', 'DomainRegistrationData');
            const { login, password, email } = registrationData;
            const user: User                 = await this._prisma.user.findFirst({ where: { login } });

            if (!user) {
                const passwordHash  = await this._hashService.hash(password);
                const newUser: User = await this._prisma.user.create({
                    data: {
                        login,
                        email,
                        password: passwordHash,
                    },
                });
                const tokens        = await this._tokensService.generate({
                    login, fingerprint,
                });
                return {
                    tokens,
                    user: {
                        id    : newUser.id,
                        login : newUser.login,
                        avatar: newUser.avatar,
                    },
                };
            } else {
                throw new Error('This login is already taken');
            }
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoAuthenticationService.name, 400);
        }
    }

    async refresh (token: string, fingerprint: DomainFingerprint): Promise<DomainAuthResponse> {
        throw new Error('Method not implemented.');
    }
}