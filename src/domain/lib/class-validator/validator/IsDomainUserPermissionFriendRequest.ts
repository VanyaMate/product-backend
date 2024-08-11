import {
    ValidatorConstraintInterface,
} from 'class-validator';
import {
    DomainUserPermissionsFriendRequest,
} from 'product-types/dist/user/DomainUserPermissions';


export class IsDomainUserPermissionFriendRequest implements ValidatorConstraintInterface {
    validate (value: unknown): boolean | Promise<boolean> {
        if (typeof value !== 'string') {
            return false;
        }

        switch (value) {
            case DomainUserPermissionsFriendRequest.ALL:
            case DomainUserPermissionsFriendRequest.NONE:
                return true;
            default:
                return false;
        }
    }

    defaultMessage (): string {
        return '($value) is not permission';
    }
}