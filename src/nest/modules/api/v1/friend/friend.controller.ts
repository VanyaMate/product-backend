import {
    Controller,
    Delete,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { Request } from 'express';
import { FriendService } from '@/nest/modules/api/v1/friend/friend.service';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';


@Controller('api/v1/friend')
export class FriendController {
    constructor (private readonly _service: FriendService) {
    }

    @Post('/:userId')
    @UseGuards(IsUserGuard)
    add (
        @Req() request: Request,
        @Param('userId') userId: string,
    ) {
        return this._service.add(request[REQUEST_USER_ID], userId);
    }

    @Delete('/remove/:userId')
    @UseGuards(IsUserGuard)
    remove (
        @Req() request: Request,
        @Param('userId') userId: string,
    ) {
        return this._service.remove(request[REQUEST_USER_ID], userId);
    }

    @Delete('/cancel/:userId')
    @UseGuards(IsUserGuard)
    cancel (
        @Req() request: Request,
        @Param('userId') userId: string,
    ) {
        return this._service.cancel(request[REQUEST_USER_ID], userId);
    }
}