import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { UserId } from '@/nest/decorators/userid.decorator';
import { CallsService } from '@/nest/modules/api/v1/calls/calls.service';


@Controller(`/api/v1/calls`)
export class CallsController {

    constructor (private readonly _service: CallsService) {
    }

    @Get()
    @UseGuards(IsUserGuard)
    getMyNotFinishedCalls (
        @UserId() userId: string,
        @Query('limit') limit: string | undefined,
        @Query('cursor') cursor: string | undefined,
    ) {
        return this._service.getMyNotFinishedCalls(
            userId,
            cursor ? cursor : undefined,
            limit ? Number(limit) : 10,
        );
    }
}