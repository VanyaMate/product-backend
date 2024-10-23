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


@Controller('api/v1/post-comment')
export class PostCommentController {
    constructor (private readonly _service: PostCommentService) {
    }

    @Post(':id')
    @UseGuards(IsUserGuard)
    create (
        @UserId() userId: string,
        @Param('id') id: string,
        @Body() createData: PostCommentCreateDataDto,
    ) {
        return this._service.createComment(userId, id, createData);
    }

    @Patch(':id')
    @UseGuards(IsUserGuard)
    update (
        @UserId() userId: string,
        @Param('id') id: string,
        @Body() updateData: PostCommentCreateDataDto,
    ) {
        return this._service.updateComment(userId, id, updateData);
    }

    @Delete(':id')
    @UseGuards(IsUserGuard)
    remove (
        @UserId() userId: string,
        @Param('id') id: string,
    ) {
        return this._service.removeComment(userId, id);
    }

    @Get(':id')
    @UseGuards(IsUserGuard)
    getById (
        @UserId() userId: string,
        @Param('id') id: string,
    ) {
        return this._service.getComment(userId, id);
    }

    @Post('/like/:id')
    @UseGuards(IsUserGuard)
    like (
        @UserId() userId: string,
        @Param('id') id: string,
    ) {
        return this._service.likeComment(userId, id);
    }

    @Post('/unlike/:id')
    @UseGuards(IsUserGuard)
    unlike (
        @UserId() userId: string,
        @Param('id') id: string,
    ) {
        return this._service.dislikeComment(userId, id);
    }
}