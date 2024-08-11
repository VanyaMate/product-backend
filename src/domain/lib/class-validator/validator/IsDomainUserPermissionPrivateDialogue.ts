import {
    ValidatorConstraintInterface,
} from 'class-validator';
import {
    DomainUserPermissionsFriendRequest, DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';


export class IsDomainUserPermissionPrivateDialogue implements ValidatorConstraintInterface {
    validate (value: unknown): boolean | Promise<boolean> {
        if (typeof value !== 'string') {
            return false;
        }

        switch (value) {
            case DomainUserPermissionsPrivateDialogue.ALL:
            case DomainUserPermissionsPrivateDialogue.FRIENDS:
            case DomainUserPermissionsPrivateDialogue.NONE:
                return true;
            default:
                return false;
        }
    }

    defaultMessage (): string {
        return '($value) is not permission';
    }
}