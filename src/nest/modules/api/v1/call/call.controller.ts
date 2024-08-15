import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { CallService } from '@/nest/modules/api/v1/call/call.service';
import { UserId } from '@/nest/decorators/userid.decorator';
import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';
import { DomainCallAnswer } from 'product-types/dist/call/DomainCallAnswer';


@Controller(`/api/v1/call`)
export class CallController {
    constructor (private readonly _service: CallService) {
    }

    @Post(`/offer/:userId`)
    @UseGuards(IsUserGuard)
    createOffer (
        @UserId() userId: string,
        @Param('userId') toUserId: string,
        @Body() offer: DomainCallOffer,
    ) {
        return this._service.createOffer(userId, toUserId, offer);
    }

    @Post(`/answer/:userId`)
    @UseGuards(IsUserGuard)
    createAnswer (
        @UserId() userId: string,
        @Param('userId') toUserId: string,
        @Body() answer: DomainCallAnswer,
    ) {
        return this._service.createAnswer(userId, toUserId, answer);
    }
}