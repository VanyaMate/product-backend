import {
    DomainAuthResponse,
    DomainLoginData,
    DomainRegistrationData,
} from 'product-types';
import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';


export interface IAuthenticationService {
    login (loginData: DomainLoginData, fingerprint: DomainFingerprint): Promise<DomainAuthResponse>;

    registration (registrationData: DomainRegistrationData, fingerprint: DomainFingerprint): Promise<DomainAuthResponse>;

    refresh (refreshToken: string, fingerprint: DomainFingerprint): Promise<[ string, string ]>;

    logout (refreshToken: string, fingerprint: DomainFingerprint): Promise<boolean>;
}