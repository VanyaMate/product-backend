import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import { UserId } from '@/nest/decorators/userid.decorator';
import {
    PostCommentCreateDataDto,
} from '@/nest/modules/api/v1/post-comment/dto/post-comment-create-data.dto';
import {
    PostCommentService,
} from '@/nest/modules/api/v1/post-comment/post-comment.service';


/**
 * Если вдруг я захочу это поменять на просто comment.
 *
 * Так сделано чтобы разделить комменатрии по "типам". Да, они будут похожи,
 * но зато это разные сущности и бд.
 */

@Controller('api/v1/post-comment')
export class PostCommentController {
    constructor (private readonly _service: PostCommentService) {
    }

    @Post(':postId')
    @UseGuards(IsUserGuard)
    create (
        @UserId() userId: string,
        @Param('postId') postId: string,
        @Body() createData: PostCommentCreateDataDto,
    ) {
        return this._service.createComment(userId, postId, createData);
    }

    @Patch(':commentId')
    @UseGuards(IsUserGuard)
    update (
        @UserId() userId: string,
        @Param('commentId') commentId: string,
        @Body() updateData: PostCommentCreateDataDto,
    ) {
        return this._service.updateComment(userId, commentId, updateData);
    }

    @Delete(':commentId')
    @UseGuards(IsUserGuard)
    remove (
        @UserId() userId: string,
        @Param('commentId') commentId: string,
    ) {
        return this._service.removeComment(userId, commentId);
    }

    @Post('/reply/:postId/:commentId')
    @UseGuards(IsUserGuard)
    createReplyOnComment (
        @UserId() userId: string,
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
        @Body() createData: PostCommentCreateDataDto,
    ) {
        return this._service.replyOnComment(userId, postId, commentId, createData);
    }

    @Get(':commentId')
    @UseGuards(IsUserGuard)
    getById (
        @UserId() userId: string,
        @Param('commentId') commentId: string,
    ) {
        return this._service.getComment(userId, commentId);
    }

    @Post('/like/:commentId')
    @UseGuards(IsUserGuard)
    like (
        @UserId() userId: string,
        @Param('commentId') commentId: string,
    ) {
        return this._service.likeComment(userId, commentId);
    }

    @Post('/unlike/:commentId')
    @UseGuards(IsUserGuard)
    unlike (
        @UserId() userId: string,
        @Param('commentId') commentId: string,
    ) {
        return this._service.dislikeComment(userId, commentId);
    }
}