import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import {
    UserAvatarUpdateDto,
} from '@/nest/modules/api/v1/user/dto/user-avatar-update.dto';
import { UserService } from '@/nest/modules/api/v1/user/user.service';
import {
    UserLoginUpdateDto,
} from '@/nest/modules/api/v1/user/dto/user-login-update.dto';
import { UserId } from '@/nest/decorators/userid.decorator';
import {
    UserUpdatePasswordDto,
} from '@/nest/modules/api/v1/user/dto/user-update-password.dto';
import { RefreshToken } from '@/nest/decorators/refresh-token.decorator';
import { Fingerprint } from '@/nest/decorators/finger-print.decorator';
import {
    DomainFingerprint,
} from 'product-types/dist/fingerprint/DomainFingerprint';
import {
    UserPermissionsUpdateDto,
} from '@/nest/modules/api/v1/user/dto/user-permissions-update.dto';
import {
    UserContactInfoUpdateDto,
} from '@/nest/modules/api/v1/user/dto/user-contact-info-update.dto';
import {
    UserUpdateBackgroundDto,
} from '@/nest/modules/api/v1/user/dto/user-update-background.dto';


@Controller(`/api/v1/user`)
export class UserController {
    constructor (private readonly _service: UserService) {
    }

    @Patch(`/avatar`)
    @UseGuards(IsUserGuard)
    updateAvatar (
        @Body() updateData: UserAvatarUpdateDto,
        @UserId() userId: string,
    ) {
        return this._service.updateAvatar(userId, updateData.avatar);
    }

    @Patch(`/login`)
    @UseGuards(IsUserGuard)
    updateLogin (
        @Body() updateData: UserLoginUpdateDto,
        @UserId() userId: string,
    ) {
        return this._service.updateLogin(userId, updateData.login);
    }

    @Patch(`/password`)
    @UseGuards(IsUserGuard)
    async updatePassword (
        @Body() passwordData: UserUpdatePasswordDto,
        @UserId() userId: string,
        @RefreshToken() refreshToken: string,
        @Fingerprint() fingerprint: DomainFingerprint,
    ) {
        return this._service.updatePassword(userId, passwordData.password, refreshToken, fingerprint);
    }

    @Patch(`/background`)
    @UseGuards(IsUserGuard)
    updateBackground (
        @Body() updateData: UserUpdateBackgroundDto,
        @UserId() userId: string,
    ) {
        return this._service.updateBackground(userId, updateData.background);
    }

    @Patch(`/contact-info`)
    @UseGuards(IsUserGuard)
    updateContactInfo (
        @Body() updateData: UserContactInfoUpdateDto,
        @UserId() userId: string,
    ) {
        return this._service.updateContactInfo(userId, updateData);
    }

    @Patch(`/permissions`)
    @UseGuards(IsUserGuard)
    updatePermissions (
        @Body() updateData: UserPermissionsUpdateDto,
        @UserId() userId: string,
    ) {
        return this._service.updatePermissions(userId, updateData);
    }
}