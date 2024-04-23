import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { UserService } from '@/nest/modules/api/v1/user/user.service';


@Controller('/api/v1/user')
export class UserController {
    constructor (private readonly _service: UserService) {
    }

    @Get('/list')
    @UseGuards(IsUserGuard)
    getUsersByLogins (
        @Query('logins') logins: string,
    ) {
        return this._service.getUsersByLogins(logins.split(','));
    }

    @Get('/full/:login')
    @UseGuards(IsUserGuard)
    getUserFullByLogin (
        @Param('login') login: string,
    ) {
        return this._service.getUserFullByLogin(login);
    }

    @Get('/private/:login')
    @UseGuards(IsUserGuard)
    getPrivateUserFullByLogin (
        @Param('login') login: string,
    ) {
        return this._service.getPrivateUserFullByLogin(login);
    }

    @Get('/:login')
    @UseGuards(IsUserGuard)
    getUserByLogin (
        @Param('login') login: string,
    ) {
        return this._service.getUserByLogin(login);
    }
}