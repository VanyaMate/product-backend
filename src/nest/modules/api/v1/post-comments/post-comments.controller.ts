import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import {
    PostCommentsService,
} from '@/nest/modules/api/v1/post-comments/post-comments.service';
import { UserId } from '@/nest/decorators/userid.decorator';


@Controller(`/api/v1/post-comments`)
export class PostCommentsController {
    constructor (private readonly _service: PostCommentsService) {
    }

    @Get('/replies/:commentId')
    @UseGuards(IsUserGuard)
    getRepliedComment (
        @Param('commentId') commentId: string,
        @Query('take') take: string,
        @Query('limit') limit: string,
        @UserId() userId: string,
    ) {
        return this._service.getCommentReplies(
            userId,
            commentId,
            take ? Number(take) : undefined,
            limit ? Number(limit) : undefined,
        );
    }

    @Get('/replies/:commentId/:cursorId')
    @UseGuards(IsUserGuard)
    getRepliedCommentByCursor (
        @Param('commentId') commentId: string,
        @Param('cursorId') cursorId: string,
        @Query('take') take: string,
        @UserId() userId: string,
    ) {
        return this._service.getCommentRepliesByCursor(
            userId,
            commentId,
            cursorId,
            take ? Number(take) : undefined,
        );
    }
}