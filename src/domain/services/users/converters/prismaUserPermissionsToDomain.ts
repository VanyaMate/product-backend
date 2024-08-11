import { UserPermissions } from '@prisma/client';
import {
    DomainUserPermissions,
    DomainUserPermissionsDialogue,
    DomainUserPermissionsFriendRequest,
    DomainUserPermissionsGeneralPage,
    DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';


export const prismaUserPermissionsToDomain = function (permissions: UserPermissions): DomainUserPermissions {
    return {
        dialogue       : permissions.dialogue as DomainUserPermissionsDialogue,
        friendRequest  : permissions.friendRequest as DomainUserPermissionsFriendRequest,
        generalPage    : permissions.generalPage as DomainUserPermissionsGeneralPage,
        privateDialogue: permissions.privateDialogue as DomainUserPermissionsPrivateDialogue,
    };
};