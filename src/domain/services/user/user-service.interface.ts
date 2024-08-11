import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainUserContactsInfo,
} from 'product-types/dist/user/DomainUserContactsInfo';
import {
    DomainFingerprint,
} from 'product-types/dist/fingerprint/DomainFingerprint';
import {
    DomainAuthResponse,
} from 'product-types/dist/authorization/DomainAuthResponse';
import {
    DomainUserPermissions,
} from 'product-types/dist/user/DomainUserPermissions';


export interface IUserService {
    updatePassword (userId: string, password: string, refreshToken: string, fingerprint: DomainFingerprint): Promise<[ DomainAuthResponse, Array<NotificationServiceResponse> ]>;

    updateAvatar (userId: string, avatarUrl: string): Promise<Array<NotificationServiceResponse>>;

    updateLogin (userId: string, login: string): Promise<Array<NotificationServiceResponse>>;

    updateBackground (userId: string, backgroundUrl: string): Promise<Array<NotificationServiceResponse>>;

    updateContactInfo (userId: string, contactInfo: DomainUserContactsInfo): Promise<Array<NotificationServiceResponse>>;

    updatePermissions (userId: string, permissions: DomainUserPermissions): Promise<Array<NotificationServiceResponse>>;
}