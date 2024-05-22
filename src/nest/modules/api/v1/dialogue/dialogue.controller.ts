import {
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import {
    DialogueService,
} from '@/nest/modules/api/v1/dialogue/dialogue.service';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';


@Controller('/api/v1/dialogue')
export class DialogueController {
    constructor (private readonly _service: DialogueService) {
    }

    @Post('/:withUser')
    @UseGuards(IsUserGuard)
    create (
        @Req() request: Request,
        @Param('withUser') withUser: string,
    ) {
        return this._service.create(request[REQUEST_USER_ID], withUser);
    }

    @Patch('/:dialogId')
    @UseGuards(IsUserGuard)
    archive (
        @Req() request: Request,
        @Param('dialogId') dialogId: string,
    ) {
        return this._service.archive(request[REQUEST_USER_ID], dialogId);
    }

    @Delete('/:dialogId')
    @UseGuards(IsUserGuard)
    remove (
        @Req() request: Request,
        @Param('dialogId') dialogId: string,
    ) {
        return this._service.remove(request[REQUEST_USER_ID], dialogId);
    }
}