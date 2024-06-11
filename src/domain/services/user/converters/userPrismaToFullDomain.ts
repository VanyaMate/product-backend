import { User, UserPreferences } from '@prisma/client';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    DomainUserPermissionsDialogue,
    DomainUserPermissionsFriendRequest,
    DomainUserPermissionsGeneralPage, DomainUserPermissionsPrivateDialogue,
} from 'product-types/dist/user/DomainUserPermissions';


export const userPrismaToFullDomain = function (user: User & {
    preferences: UserPreferences
}): DomainUserFull {
    return {
        id         : user.id,
        login      : user.login,
        avatar     : user.avatar,
        contacts   : {
            email      : user.email,
            phoneNumber: user.phoneNumber,
        },
        nameInfo   : {
            firstName: user.firstName,
            lastName : user.lastName,
        },
        permissions: {
            dialogue       : user.preferences.dialogue as DomainUserPermissionsDialogue,
            friendRequest  : user.preferences.friendRequest as DomainUserPermissionsFriendRequest,
            generalPage    : user.preferences.generalPage as DomainUserPermissionsGeneralPage,
            privateDialogue: user.preferences.privateDialogue as DomainUserPermissionsPrivateDialogue,
        },
    };
};