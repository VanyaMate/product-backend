import { Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { Request, Response } from 'express';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';


@Controller('/api/v1/notification')
export class NotificationController {
    constructor (private readonly _service: NotificationService) {
    }

    @Post()
    @UseGuards(IsUserGuard)
    connect (
        @Req() request: Request,
        @Res() response: Response,
    ) {
        response.setHeader('Content-Type', 'text/event-stream');
        response.setHeader('Cache-Control', 'no-cache');

        this._service.add(request[REQUEST_USER_ID], request, response);
    }

    @Get('/send')
    send (
        @Query('message') message: string,
        @Query('user_login') login: string,
    ) {
        console.log(message, login);
        return this._service.sendToUser(login, message);
    }
}