import { Injectable } from '@nestjs/common';
import { IPostsService } from '@/domain/services/posts/posts-service.interface';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import {
    DomainSearchCursorOptions,
} from 'product-types/dist/search/DomainSearchCursorOptions';
import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaPostsService,
} from '@/domain/services/posts/implementations/prisma-posts.service';
import {
    globalExceptionServiceErrorResponse
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class PostsService {
    private readonly _service: IPostsService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaPostsService(this._prisma);
    }

    async getByUserId (userId: string, options: DomainSearchItemOptions): Promise<DomainSearchItem> {
        try {
            return await this._service.getByUserId(userId, options);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostsService.name, 400, 'Cant get posts'));
        }
    }

    async getByUserIdWithCursor (userId: string, options: DomainSearchCursorOptions): Promise<DomainSearchItem> {
        try {
            return await this._service.getByUserIdWithCursor(userId, options);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostsService.name, 400, 'Cant get posts'));
        }
    }

    async getById (postId: string): Promise<DomainPost> {
        try {
            return await this._service.getById(postId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostsService.name, 400, 'Cant get post'));
        }
    }
}