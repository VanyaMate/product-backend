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
import { REQUEST_USER_ID } from '@/domain/consts/request-response';
import {
    PrivateDialogueService,
} from '@/nest/modules/api/v1/private-dialogue/private-dialogue.service';


@Controller('/api/v1/private-dialogue')
export class PrivateDialogueController {
    constructor (private readonly _service: PrivateDialogueService) {
    }

    @Post('/:withUserId')
    @UseGuards(IsUserGuard)
    create (
        @Param('withUserId') withUserId: string,
        @Req() request: Request,
    ) {
        return this._service.create(request[REQUEST_USER_ID], withUserId);
    }

    @Post('/archive/:dialogueId')
    @UseGuards(IsUserGuard)
    archive (
        @Param('dialogueId') dialogueId: string,
        @Req() request: Request,
    ) {
        return this._service.archive(request[REQUEST_USER_ID], dialogueId);
    }

    @Delete('/:dialogueId')
    @UseGuards(IsUserGuard)
    remove (
        @Param('dialogueId') dialogueId: string,
        @Req() request: Request,
    ) {
        return this._service.remove(request[REQUEST_USER_ID], dialogueId);
    }
}