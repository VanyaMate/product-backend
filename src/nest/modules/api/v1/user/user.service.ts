import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import { IUserService } from '@/domain/services/user/user-service.interface';
import {
    PrismaUserService,
} from '@/domain/services/user/implementations/prisma-user.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';
import {
    BcryptHashService,
} from '@/domain/services/hash/implementations/bcrypt-hash.service';
import { TokenService } from '@/nest/modules/api/v1/token/token.service';
import {
    DomainFingerprint,
} from 'product-types/dist/fingerprint/DomainFingerprint';
import {
    DomainUserContactsInfo,
} from 'product-types/dist/user/DomainUserContactsInfo';
import {
    DomainUserPermissions,
    DomainUserPermissionsDialogue,
} from 'product-types/dist/user/DomainUserPermissions';


@Injectable()
export class UserService {
    private readonly _service: IUserService;

    constructor (
        private readonly _prisma: PrismaService,
        private readonly _notification: NotificationService,
        private readonly _tokensService: TokenService,
    ) {
        this._service = new PrismaUserService(
            this._prisma,
            new BcryptHashService(),
            this._tokensService,
        );
    }

    async updateAvatar (userId: string, avatar: string) {
        try {
            const [ active ] = await this._service.updateAvatar(userId, avatar);
            this._notification.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, UserService.name, 400, 'Cant update avatar'));
        }
    }

    async updateLogin (userId: string, login: string) {
        try {
            const [ active ] = await this._service.updateLogin(userId, login);
            this._notification.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, UserService.name, 400, 'Cant update login'));
        }
    }

    async updatePassword (userId: string, password: string, refreshToken: string, fingerprint: DomainFingerprint) {
        try {
            const [ authResponse, active ] = await this._service.updatePassword(userId, password, refreshToken, fingerprint);
            this._notification.send(active);
            return authResponse;
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, UserService.name, 400, 'Cant update password'));
        }
    }

    async updateBackground (userId: string, backgroundUrl: string) {
        try {
            const [ active ] = await this._service.updateBackground(userId, backgroundUrl);
            this._notification.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, UserService.name, 400, 'Cant update background'));
        }
    }

    async updateContactInfo (userId: string, contactInfo: DomainUserContactsInfo) {
        try {
            const [ active ] = await this._service.updateContactInfo(userId, contactInfo);
            this._notification.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, UserService.name, 400, 'Cant update contact info'));
        }
    }

    async updatePermissions (userId: string, permissions: DomainUserPermissions) {
        try {
            const [ active ] = await this._service.updatePermissions(userId, permissions);
            this._notification.send([ active ]);
            return active[2];
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, UserService.name, 400, 'Cant update permissions'));
        }
    }
}