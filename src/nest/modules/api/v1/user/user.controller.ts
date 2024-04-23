import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { UserService } from '@/nest/modules/api/v1/user/user.service';


@Controller('/api/v1/user')
export class UserController {

    constructor (private readonly _service: UserService) {
    }

    @Get('/:login')
    @UseGuards(IsUserGuard)
    getUserByLogin (
        @Param('login') login: string,
    ) {
        return this._service.getUserByLogin(login);
    }

}