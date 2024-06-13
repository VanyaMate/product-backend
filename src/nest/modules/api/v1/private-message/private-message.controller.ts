import {
    Body,
    Controller, Delete, Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import {
    PrivateMessageService,
} from '@/nest/modules/api/v1/private-message/private-message.service';
import { Request } from 'express';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';
import {
    PrivateMessageCreateDataDto,
} from '@/nest/modules/api/v1/private-message/dto/private-message-create-data.dto';
import {
    PrivateMessageUpdateDataDto,
} from '@/nest/modules/api/v1/private-message/dto/private-message-update-data.dto';


@Controller('/api/v1/private-message')
export class PrivateMessageController {
    constructor (private readonly _service: PrivateMessageService) {
    }

    @Post('/:dialogueId')
    @UseGuards(IsUserGuard)
    send (
        @Param('dialogueId') dialogueId: string,
        @Req() request: Request,
        @Body() messageData: PrivateMessageCreateDataDto,
    ) {
        return this._service.send(request[REQUEST_USER_ID], dialogueId, messageData);
    }

    @Patch('/:messageId')
    @UseGuards(IsUserGuard)
    update (
        @Param('messageId') messageId: string,
        @Req() request: Request,
        @Body() messageData: PrivateMessageUpdateDataDto,
    ) {
        return this._service.update(request[REQUEST_USER_ID], messageId, messageData);
    }

    @Delete('/:messageId')
    @UseGuards(IsUserGuard)
    remove (
        @Param('messageId') messageId: string,
        @Req() request: Request,
    ) {
        return this._service.remove(request[REQUEST_USER_ID], messageId);
    }

    @Get('/:messageId')
    @UseGuards(IsUserGuard)
    read (
        @Param('messageId') messageId: string,
        @Req() request: Request,
    ) {
        return this._service.read(request[REQUEST_USER_ID], messageId);
    }

    @Get('/all/:dialogueId')
    @UseGuards(IsUserGuard)
    readAll (
        @Param('dialogueId') dialogueId: string,
        @Req() request: Request,
    ) {
        return this._service.readAll(request[REQUEST_USER_ID], dialogueId);
    }
}