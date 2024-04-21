import {
    DomainAuthResponse,
    DomainLoginData,
    DomainRegistrationData,
} from 'product-types';
import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';


export interface IAuthenticationService {
    login (loginData: DomainLoginData, fingerPrint: DomainFingerprint): Promise<DomainAuthResponse>;

    registration (registrationData: DomainRegistrationData, fingerPrint: DomainFingerprint): Promise<DomainAuthResponse>;

    refresh (token: string, fingerPrint: DomainFingerprint): Promise<DomainAuthResponse>;
}