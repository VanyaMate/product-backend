import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { Request } from 'express';
import { FriendsService } from '@/nest/modules/api/v1/friends/friends.service';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';


@Controller('/api/v1/friends')
export class FriendsController {
    constructor (private readonly _service: FriendsService) {
    }

    @Get('/sent')
    @UseGuards(IsUserGuard)
    sent (@Req() request: Request) {
        return this._service.getFriendRequestsSentByUserId(request[REQUEST_USER_ID]);
    }

    @Get('/received')
    @UseGuards(IsUserGuard)
    received (@Req() request: Request) {
        return this._service.getFriendRequestsReceivedByUserId(request[REQUEST_USER_ID]);
    }

    @Get('')
    @UseGuards(IsUserGuard)
    my (@Req() request: Request) {
        return this._service.getFriendsWithRequestsByUserId(request[REQUEST_USER_ID]);
    }

    @Get('/requests')
    @UseGuards(IsUserGuard)
    all (@Req() request: Request) {
        return this._service.getFriendRequestsByUserId(request[REQUEST_USER_ID]);
    }

    @Get('/list')
    @UseGuards(IsUserGuard)
    friends (@Req() request: Request) {
        return this._service.getFriendsOfUserByUserId(request[REQUEST_USER_ID]);
    }

    @Get('/:userId')
    @UseGuards(IsUserGuard)
    byUserId (
        @Param('userId') userId: string,
    ) {
        return this._service.getFriendsOfUserByUserId(userId);
    }
}