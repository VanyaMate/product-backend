import {
    ValidatorConstraintInterface,
} from 'class-validator';
import {
    DomainUserPermissionsDialogue,
    DomainUserPermissionsFriendRequest, DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';


export class IsDomainUserPermissionDialogue implements ValidatorConstraintInterface {
    validate (value: unknown): boolean | Promise<boolean> {
        if (typeof value !== 'string') {
            return false;
        }

        switch (value) {
            case DomainUserPermissionsDialogue.ALL:
            case DomainUserPermissionsDialogue.FRIENDS:
            case DomainUserPermissionsDialogue.NONE:
                return true;
            default:
                return false;
        }
    }

    defaultMessage (): string {
        return '($value) is not permission';
    }
}