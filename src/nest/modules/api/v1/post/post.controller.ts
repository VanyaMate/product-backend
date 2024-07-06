import {
    Body,
    Controller,
    Delete, Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import {
    PostCreateDataDto,
} from '@/nest/modules/api/v1/post/dto/post-create-data.dto';
import { PostService } from '@/nest/modules/api/v1/post/post.service';
import { Request } from 'express';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';


@Controller('api/v1/post')
export class PostController {
    constructor (private readonly _service: PostService) {
    }

    @Post()
    @UseGuards(IsUserGuard)
    create (
        @Body() data: PostCreateDataDto,
        @Req() request: Request,
    ) {
        return this._service.create(request[REQUEST_USER_ID], data);
    }


    @Patch(`/:postId`)
    @UseGuards(IsUserGuard)
    update (
        @Body() data: PostCreateDataDto,
        @Req() request: Request,
        @Param(`postId`) postId: string,
    ) {
        return this._service.update(request[REQUEST_USER_ID], postId, data);
    }


    @Delete(`/:postId`)
    @UseGuards(IsUserGuard)
    remove (
        @Req() request: Request,
        @Param(`postId`) postId: string,
    ) {
        return this._service.remove(request[REQUEST_USER_ID], postId);
    }
}