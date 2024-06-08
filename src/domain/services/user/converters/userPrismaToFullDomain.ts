import { Prisma, User, UserPreferences } from '@prisma/client';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    DomainUserPreferencesDialogue, DomainUserPreferencesFriendRequest,
    DomainUserPreferencesGeneralPage, DomainUserPreferencesPrivateDialogue,
} from 'product-types/dist/user/DomainUserPreferences';


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
        preferences: {
            dialogue       : user.preferences.dialogue as DomainUserPreferencesDialogue,
            friendRequest  : user.preferences.friendRequest as DomainUserPreferencesFriendRequest,
            generalPage    : user.preferences.generalPage as DomainUserPreferencesGeneralPage,
            privateDialogue: user.preferences.privateDialogue as DomainUserPreferencesPrivateDialogue,
        },
    };
};