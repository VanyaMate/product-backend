import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import {
    PrivateDialogueListDto,
} from '@/nest/modules/api/v1/private-dialogues/dto/private-dialogue-list.dto';
import {
    PrivateDialoguesService,
} from '@/nest/modules/api/v1/private-dialogues/private-dialogues.service';
import { Request } from 'express';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';


@Controller('/api/v1/private-dialogues')
export class PrivateDialoguesController {
    constructor (private readonly _service: PrivateDialoguesService) {
    }

    @Get('/list')
    @UseGuards(IsUserGuard)
    getList (
        @Query() query: PrivateDialogueListDto,
        @Req() request: Request,
    ) {
        return this._service.getList(request[REQUEST_USER_ID], query);
    }

    @Get('/:dialogueId')
    @UseGuards(IsUserGuard)
    getOne (
        @Param('dialogueId') dialogueId: string,
        @Req() request: Request,
    ) {
        return this._service.getOne(request[REQUEST_USER_ID], dialogueId);
    }
}