import { IAuthenticationService } from '../authentication-service.interface';
import { PrismaClient, User } from '@prisma/client';
import {
    assertDomainLoginData,
    DomainAuthResponse,
    DomainLoginData,
    DomainRegistrationData, serviceErrorResponse,
} from 'product-types';


export class PrismaMongoAuthenticationService implements IAuthenticationService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async login (loginData: DomainLoginData): Promise<DomainAuthResponse> {
        try {
            assertDomainLoginData(loginData, 'loginData', 'DomainLoginData');

            const { login, password } = loginData;
            // HashPassword

            const user: User = await this._prisma.user.findFirst({
                where: { login, password },
            });

            // getAuthResponse();
            if (user) {
                return {
                    token: '',
                    user : {
                        id    : user.id,
                        login : user.login,
                        avatar: user.avatar,
                    },
                };
            } else {
                throw new Error('User not found');
            }
        } catch (e) {
            throw serviceErrorResponse(e, PrismaMongoAuthenticationService.name, 403);
        }
    }

    async registration (registrationData: DomainRegistrationData): Promise<DomainAuthResponse> {
        throw new Error('Method not implemented.');
    }

    async refresh (token: string): Promise<DomainAuthResponse> {
        throw new Error('Method not implemented.');
    }
}