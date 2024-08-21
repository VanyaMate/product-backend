import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { CallService } from '@/nest/modules/api/v1/call/call.service';
import { UserId } from '@/nest/decorators/userid.decorator';
import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';
import { DomainCallAnswer } from 'product-types/dist/call/DomainCallAnswer';
import { ConnectionId } from '@/nest/decorators/connection-id.decorator';


@Controller(`/api/v1/call`)
export class CallController {
    constructor (private readonly _service: CallService) {
    }

    @Post(`/offer/:callId`)
    @UseGuards(IsUserGuard)
    createOffer (
        @UserId() userId: string,
        @ConnectionId() connectionId: string,
        @Param('callId') callId: string,
        @Body() offer: DomainCallOffer,
    ) {
        return this._service.createOffer(userId, callId, offer, connectionId);
    }

    @Post(`/answer/:callId`)
    @UseGuards(IsUserGuard)
    createAnswer (
        @UserId() userId: string,
        @Param('callId') callId: string,
        @Body() answer: DomainCallAnswer,
    ) {
        return this._service.createAnswer(userId, callId, answer);
    }

    @Post(`/:userId`)
    @UseGuards(IsUserGuard)
    createCallRequest (
        @UserId() userId: string,
        @ConnectionId() connectionId: string,
        @Param('userId') toUserId: string,
    ) {
        return this._service.createCallRequest(userId, toUserId, connectionId);
    }

    @Post(`/finish/:callId`)
    @UseGuards(IsUserGuard)
    finishCall (
        @UserId() userId: string,
        @Param('callId') callId: string,
    ) {
        return this._service.finishCall(userId, callId);
    }
}