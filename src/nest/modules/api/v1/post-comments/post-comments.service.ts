import { Injectable } from '@nestjs/common';
import {
    IPostCommentsService,
} from '@/domain/services/post-comments/post-comments-service.interface';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaPostCommentsService,
} from '@/domain/services/post-comments/implementations/prisma/prisma-post-comments.service';
import { DomainComment } from 'product-types/dist/comment/DomainComment';
import {
    DomainServiceErrorException
} from '@/nest/exceptions/domain-service-error.exception';
import {
    globalExceptionServiceErrorResponse
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class PostCommentsService {
    private readonly _service: IPostCommentsService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaPostCommentsService(this._prisma);
    }

    async getCommentReplies (userId: string, commentId: string, take: number = 3, skip: number = 0): Promise<DomainComment[]> {
        try {
            return await this._service.getCommentReplies(userId, commentId, take, skip);
        }
        catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentsService.name, 400, 'Cant get replies'));
        }
    }

    async getCommentRepliesByCursor (userId: string, commentId: string, cursor: string, take: number = 3): Promise<DomainComment[]> {
        try {
            return await this._service.getCommentRepliesByCursor(userId, commentId, cursor, take);
        }
        catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentsService.name, 400, 'Cant get replies'));
        }
    }

}