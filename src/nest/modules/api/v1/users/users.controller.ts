import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { UsersService } from '@/nest/modules/api/v1/users/users.service';


@Controller('/api/v1/users')
export class UsersController {
    constructor (private readonly _service: UsersService) {
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

    @Get('/find-start/:login')
    @UseGuards(IsUserGuard)
    findUserByStartLogin (
        @Param('login') login: string,
    ) {
        return this._service.findUserByStartLogin(login);
    }

    @Get('/:login')
    @UseGuards(IsUserGuard)
    getUserByLogin (
        @Param('login') login: string,
    ) {
        return this._service.getUserByLogin(login);
    }
}