import { IUserService } from '@/domain/services/user/user-service.interface';
import {
    NotificationServiceResponse,
} from '../../notification/types/NotificationServiceResponse';
import { PrismaClient } from '@prisma/client';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';
import {
    DomainUserContactsInfo,
} from 'product-types/dist/user/DomainUserContactsInfo';
import {
    DomainFingerprint,
} from 'product-types/dist/fingerprint/DomainFingerprint';
import { IHashService } from '@/domain/services/hash/hash-service.interface';
import {
    ITokensService,
} from '@/domain/services/tokens/tokens-service.interface';
import {
    DomainAuthResponse,
} from 'product-types/dist/authorization/DomainAuthResponse';
import {
    prismaUserContactToDomain,
} from '@/domain/services/users/converters/prismaUserContactToDomain';
import {
    DomainUserPermissions,
} from 'product-types/dist/user/DomainUserPermissions';
import {
    prismaUserPermissionsToDomain,
} from '@/domain/services/users/converters/prismaUserPermissionsToDomain';
import {
    prismaUserToFullDomain,
} from '@/domain/services/users/converters/prismaUserToFullDomain';
import {
    prismaToDomainFullUserInclude,
} from '@/domain/services/users/include/prisma/prisma-full-user.inculde';


export class PrismaUserService implements IUserService {
    constructor (
        private readonly _prisma: PrismaClient,
        private readonly _hashService: IHashService,
        private readonly _tokensService: ITokensService,
    ) {
    }

    async updatePassword (userId: string, password: string, refreshToken: string, fingerprint: DomainFingerprint): Promise<[ DomainAuthResponse, Array<NotificationServiceResponse> ]> {
        const passwordHash = await this._hashService.hash(password);
        const user         = await this._prisma.user.update({
            where  : { id: userId },
            data   : { password: passwordHash },
            include: prismaToDomainFullUserInclude,
        });
        await this._tokensService.removeAllTokensForUserByRefreshToken(refreshToken, fingerprint);
        const tokens = await this._tokensService.generateForUser(userId, fingerprint);

        return [
            {
                user: prismaUserToFullDomain(user),
                tokens,
            },
            [
                [
                    [ userId ],
                    DomainNotificationType.PASSWORD_UPDATE,
                    null,
                ],
            ],
        ];
    }

    async updateBackground (userId: string, backgroundUrl: string): Promise<NotificationServiceResponse[]> {
        const oldUserData = await this._prisma.user.findFirst({
            where: { id: userId },
        });

        const newUserData = await this._prisma.user.update({
            where  : { id: userId },
            data   : { background: backgroundUrl },
            include: prismaToDomainUserInclude,
        });

        return [
            [
                [ userId ],
                DomainNotificationType.USER_BACKGROUND_UPDATE_IN,
                {
                    user              : prismaUserToDomain(newUserData),
                    previousBackground: oldUserData.background,
                    currentBackground : newUserData.background,
                },
            ],
        ];
    }

    async updateContactInfo (userId: string, contactInfo: DomainUserContactsInfo): Promise<NotificationServiceResponse[]> {
        const oldUserData = await this._prisma.user.findFirst({
            where  : { id: userId },
            include: prismaToDomainUserInclude,
        });

        const newUserData = await this._prisma.user.update({
            where  : { id: userId },
            data   : {
                phoneNumber: contactInfo.phoneNumber,
                email      : contactInfo.email,
            },
            include: prismaToDomainUserInclude,
        });

        return [
            [
                [ userId ],
                DomainNotificationType.USER_CONTACTS_UPDATE_IN,
                {
                    user            : prismaUserToDomain(oldUserData),
                    previousContacts: prismaUserContactToDomain(oldUserData),
                    currentContacts : prismaUserContactToDomain(newUserData),
                },
            ],
        ];
    }

    async updatePermissions (userId: string, permissions: DomainUserPermissions): Promise<NotificationServiceResponse[]> {
        const oldUserData = await this._prisma.userPermissions.findFirst({
            where  : { userId },
            include: {
                user: { include: prismaToDomainUserInclude },
            },
        });

        const newUserData = await this._prisma.userPermissions.update({
            where: { userId },
            data : permissions,
        });

        return [
            [
                [ userId ],
                DomainNotificationType.USER_PERMISSIONS_UPDATE_IN,
                {
                    user               : prismaUserToDomain(oldUserData.user),
                    previousPermissions: prismaUserPermissionsToDomain(oldUserData),
                    currentPermissions : prismaUserPermissionsToDomain(newUserData),
                },
            ],
        ];
    }

    async updateAvatar (userId: string, avatarUrl: string): Promise<NotificationServiceResponse[]> {
        const oldUserData = await this._prisma.user.findFirst({
            where  : { id: userId },
            include: prismaToDomainUserInclude,
        });

        const newUserData = await this._prisma.user.update({
            where  : { id: userId },
            data   : { avatar: avatarUrl },
            include: prismaToDomainUserInclude,
        });

        return [
            [
                [ userId ],
                DomainNotificationType.USER_AVATAR_UPDATE_IN,
                {
                    newUser: prismaUserToDomain(newUserData),
                    oldUser: prismaUserToDomain(oldUserData),
                },
            ],
        ];
    }

    async updateLogin (userId: string, login: string): Promise<NotificationServiceResponse[]> {
        const existedLogin = await this._prisma.user.findFirst({
            where: { login },
        });

        if (existedLogin) {
            throw 'Login exist';
        }

        const oldUserData = await this._prisma.user.findFirst({
            where  : { id: userId },
            include: prismaToDomainUserInclude,
        });

        const newUserData = await this._prisma.user.update({
            where  : { id: userId },
            data   : { login },
            include: prismaToDomainUserInclude,
        });

        return [
            [
                [ userId ],
                DomainNotificationType.USER_LOGIN_UPDATE_IN,
                {
                    newUser: prismaUserToDomain(newUserData),
                    oldUser: prismaUserToDomain(oldUserData),
                },
            ],
        ];
    }
}