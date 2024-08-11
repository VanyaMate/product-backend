import { Connection, User, UserPermissions } from '@prisma/client';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    DomainUserPermissionsDialogue,
    DomainUserPermissionsFriendRequest,
    DomainUserPermissionsGeneralPage, DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';
import {
    DomainUserWithPermissions,
} from 'product-types/dist/user/DomainUserWithPermissions';
import {
    prismaUserPermissionsToDomain,
} from '@/domain/services/users/converters/prismaUserPermissionsToDomain';


export const prismaUserToPermissionsDomain = function (user: User & {
    permissions: UserPermissions,
    connections: Connection[]
}): DomainUserWithPermissions {
    return {
        id         : user.id,
        login      : user.login,
        avatar     : user.avatar,
        online     : !!user.connections.length,
        permissions: prismaUserPermissionsToDomain(user.permissions),
    };
};