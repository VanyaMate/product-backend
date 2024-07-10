import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { IsUserGuard } from '@/nest/guards/authorization/is-user.guard';
import {
    PostsSearchOptionsDto,
} from '@/nest/modules/api/v1/posts/dto/posts-search-options.dto';
import { PostsService } from '@/nest/modules/api/v1/posts/posts.service';
import {
    PostsSearchCursorDto,
} from '@/nest/modules/api/v1/posts/dto/posts-search-cursor.dto';


@Controller(`/api/v1/posts`)
export class PostsController {
    constructor (private readonly _service: PostsService) {
    }

    @Get(`/user/:id`)
    @UseGuards(IsUserGuard)
    getByUserId (
        @Param('id') id: string,
        @Query() searchOptions: PostsSearchOptionsDto,
    ) {
        return this._service.getByUserId(id, searchOptions);
    }

    @Get(`/user/:id/cursor`)
    @UseGuards(IsUserGuard)
    getByUserIdWithCursor (
        @Param('id') id: string,
        @Query() searchOptions: PostsSearchCursorDto,
    ) {
        return this._service.getByUserIdWithCursor(id, searchOptions);
    }

    @Get('/:id')
    @UseGuards(IsUserGuard)
    getById (
        @Param('id') id: string,
    ) {
        return this._service.getById(id);
    }
}