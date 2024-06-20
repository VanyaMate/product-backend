import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import {
    PrivateMessagesService,
} from '@/nest/modules/api/v1/private-messages/private-messages.service';
import { Request } from 'express';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';
import {
    PrivateMessagesSearchOptionsDto,
} from '@/nest/modules/api/v1/private-messages/dto/private-messages-search-options.dto';
import {
    PrivateMessagesSearchCursorOptionsDto,
} from '@/nest/modules/api/v1/private-messages/dto/private-messages-search-cursor-options.dto';


@Controller('/api/v1/private-messages')
export class PrivateMessagesController {
    constructor (private readonly _service: PrivateMessagesService) {
    }

    @Get('/:dialogueId')
    @UseGuards(IsUserGuard)
    get (
        @Param('dialogueId') dialogueId: string,
        @Req() request: Request,
        @Query() searchOptions: PrivateMessagesSearchOptionsDto,
    ) {
        return this._service.get(request[REQUEST_USER_ID], dialogueId, searchOptions);
    }

    @Get('/cursor/:dialogueId')
    @UseGuards(IsUserGuard)
    getByCursor (
        @Param('dialogueId') dialogueId: string,
        @Req() request: Request,
        @Query() searchOptions: PrivateMessagesSearchCursorOptionsDto,
    ) {
        return this._service.getByCursor(request[REQUEST_USER_ID], dialogueId, searchOptions);
    }
}