import {
    Controller,
    Get,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { Request, Response } from 'express';
import {
    NotificationService,
} from '@/nest/modules/api/v1/notification/notification.service';
import {
    REQUEST_USER_ID,
    RESPONSE_UPDATED_TOKENS,
} from '@/domain/consts/request-response';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';


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
        this._service.sendToUserById(request[REQUEST_USER_ID], DomainNotificationType.CONNECTED, '');
        const updatedTokens = request[RESPONSE_UPDATED_TOKENS];
        if (updatedTokens) {
            this._service.sendToUserById(request[REQUEST_USER_ID], DomainNotificationType.TOKENS_UPDATE, updatedTokens);
        }
    }

    @Get('/send')
    @UseGuards(IsUserGuard)
    send (
        @Req() request: Request,
        @Query('message') message: string,
        @Query('user_login') login: string,
    ) {
        return this._service.sendToUser(login, DomainNotificationType.MESSAGE, {
            message,
            from: request[REQUEST_USER_ID],
        });
    }
}