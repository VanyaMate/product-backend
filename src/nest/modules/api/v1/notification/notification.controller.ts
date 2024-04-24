import { Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { Request, Response } from 'express';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';
import {
    REQUEST_USER_ID,
    RESPONSE_UPDATED_TOKENS,
} from '@/domain/consts/request-response';
import { NotificationType } from 'product-types/dist/notification/DomainNotification';


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
        this._service.sendToUserById(request[REQUEST_USER_ID], {
            type  : NotificationType.CONNECTED,
            dateMs: Date.now(),
            data  : '',
        });
        const updatedTokens = request[RESPONSE_UPDATED_TOKENS];
        if (updatedTokens) {
            this._service.sendToUserById(request[REQUEST_USER_ID], {
                type  : NotificationType.TOKENS_UPDATE,
                dateMs: Date.now(),
                data  : JSON.stringify(updatedTokens),
            });
        }
    }

    @Get('/send')
    send (
        @Query('message') message: string,
        @Query('user_login') login: string,
    ) {
        return this._service.sendToUser(login, {
            type  : NotificationType.MESSAGE,
            data  : message,
            dateMs: Date.now(),
        });
    }
}