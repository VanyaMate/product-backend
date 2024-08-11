import {
    DomainUserPermissions,
    DomainUserPermissionsDialogue,
    DomainUserPermissionsFriendRequest,
    DomainUserPermissionsGeneralPage,
    DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';
import { Validate } from 'class-validator';
import {
    IsDomainUserPermissionFriendRequest,
} from '@/domain/lib/class-validator/validator/IsDomainUserPermissionFriendRequest';
import {
    IsDomainUserPermissionPrivateDialogue,
} from '@/domain/lib/class-validator/validator/IsDomainUserPermissionPrivateDialogue';
import {
    IsDomainUserPermissionDialogue,
} from '@/domain/lib/class-validator/validator/IsDomainUserPermissionDialogue';
import {
    IsDomainUserPermissionGeneralPage,
} from '@/domain/lib/class-validator/validator/IsDomainUserPermissionGeneralPage';


export class UserPermissionsUpdateDto implements DomainUserPermissions {
    @Validate(IsDomainUserPermissionFriendRequest)
    friendRequest: DomainUserPermissionsFriendRequest;

    @Validate(IsDomainUserPermissionPrivateDialogue)
    privateDialogue: DomainUserPermissionsPrivateDialogue;

    @Validate(IsDomainUserPermissionDialogue)
    dialogue: DomainUserPermissionsDialogue;

    @Validate(IsDomainUserPermissionGeneralPage)
    generalPage: DomainUserPermissionsGeneralPage;
}