import { Connection, User, UserPermissions } from '@prisma/client';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    DomainUserPermissionsDialogue,
    DomainUserPermissionsFriendRequest,
    DomainUserPermissionsGeneralPage, DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';


export const prismaUserToFullDomain = function (user: User & {
    permissions: UserPermissions,
    connections: Connection[]
}): DomainUserFull {
    return {
        id         : user.id,
        login      : user.login,
        avatar     : user.avatar,
        online     : !!user.connections.length,
        contacts   : {
            email      : user.email,
            phoneNumber: user.phoneNumber,
        },
        nameInfo   : {
            firstName: user.firstName,
            lastName : user.lastName,
        },
        permissions: {
            dialogue       : user.permissions.dialogue as DomainUserPermissionsDialogue,
            friendRequest  : user.permissions.friendRequest as DomainUserPermissionsFriendRequest,
            generalPage    : user.permissions.generalPage as DomainUserPermissionsGeneralPage,
            privateDialogue: user.permissions.privateDialogue as DomainUserPermissionsPrivateDialogue,
        },
    };
};