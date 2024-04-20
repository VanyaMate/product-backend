import {
    DomainAuthResponse,
    DomainLoginData,
    DomainRegistrationData,
} from 'product-types';


export interface IAuthenticationService {
    login (loginData: DomainLoginData): Promise<DomainAuthResponse>;

    registration (registrationData: DomainRegistrationData): Promise<DomainAuthResponse>;

    refresh (token: string): Promise<DomainAuthResponse>;
}