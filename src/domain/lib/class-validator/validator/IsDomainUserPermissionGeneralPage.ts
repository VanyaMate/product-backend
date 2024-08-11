import {
    ValidatorConstraintInterface,
} from 'class-validator';
import {
    DomainUserPermissionsDialogue,
    DomainUserPermissionsFriendRequest,
    DomainUserPermissionsGeneralPage,
    DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';


export class IsDomainUserPermissionGeneralPage implements ValidatorConstraintInterface {
    validate (value: unknown): boolean | Promise<boolean> {
        if (typeof value !== 'string') {
            return false;
        }

        switch (value) {
            case DomainUserPermissionsGeneralPage.ALL:
            case DomainUserPermissionsGeneralPage.FRIENDS:
            case DomainUserPermissionsGeneralPage.NONE:
                return true;
            default:
                return false;
        }
    }

    defaultMessage (): string {
        return '($value) is not permission';
    }
}