import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';
import {
    DomainRegistrationData
} from 'product-types/dist/authorization/DomainRegistrationData';
import { DomainLoginData } from 'product-types/dist/authorization/DomainLoginData';
import { DomainAuthResponse } from 'product-types/dist/authorization/DomainAuthResponse';


export interface IAuthenticationService {
    login (loginData: DomainLoginData, fingerprint: DomainFingerprint): Promise<DomainAuthResponse>;

    registration (registrationData: DomainRegistrationData, fingerprint: DomainFingerprint): Promise<DomainAuthResponse>;

    refresh (refreshToken: string, fingerprint: DomainFingerprint): Promise<[ string, string ]>;

    logout (refreshToken: string, fingerprint: DomainFingerprint): Promise<boolean>;
}