import { Injectable } from '@nestjs/common';
import {
    IPostCommentService,
} from '@/domain/services/post-comment/post-comment-service.interface';
import { DomainComment } from 'product-types/dist/comment/DomainComment';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';
import {
    DomainCommentUpdateData,
} from 'product-types/dist/comment/DomainCommentUpdateData';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    PrismaPostCommentService,
} from '@/domain/services/post-comment/implementations/prisma/prisma-post-comment.service';
import {
    DomainServiceErrorException,
} from '@/nest/exceptions/domain-service-error.exception';
import {
    globalExceptionServiceErrorResponse,
} from '@/domain/types/lib/globalExceptionServiceErrorResponse';


@Injectable()
export class PostCommentService {
    private readonly _service: IPostCommentService;

    constructor (private readonly _prisma: PrismaService) {
        this._service = new PrismaPostCommentService(this._prisma);
    }

    async createComment (userId: string, postId: string, createData: DomainCommentCreateData): Promise<DomainComment> {
        try {
            return await this._service.createComment(userId, postId, createData);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentService.name, 400, 'Cant create comment'));
        }
    }

    async updateComment (userId: string, commentId: string, updateData: DomainCommentUpdateData): Promise<DomainComment> {
        try {
            return await this._service.updateComment(userId, commentId, updateData);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentService.name, 400, 'Cant update comment'));
        }
    }

    async removeComment (userId: string, commentId: string): Promise<DomainComment> {
        try {
            return await this._service.removeComment(userId, commentId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentService.name, 400, 'Cant remove comment'));
        }
    }

    async getComment (userId: string, commentId: string): Promise<DomainComment> {
        try {
            return await this._service.getComment(userId, commentId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentService.name, 400, 'Cant get comment'));
        }
    }

    async replyOnComment (userId: string, postId: string, commentId: string, createData: DomainCommentCreateData): Promise<DomainComment> {
        try {
            return await this._service.replyOnComment(userId, postId, commentId, createData);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentService.name, 400, 'Cant reply comment'));
        }
    }

    async likeComment (userId: string, commentId: string): Promise<DomainComment> {
        try {
            return await this._service.likeComment(userId, commentId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentService.name, 400, 'Cant like comment'));
        }
    }

    async dislikeComment (userId: string, commentId: string): Promise<DomainComment> {
        try {
            return await this._service.dislikeComment(userId, commentId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentService.name, 400, 'Cant unlike comment'));
        }
    }

    async replyCommentIncrement (userId: string, commentId: string): Promise<DomainComment> {
        try {
            return await this._service.replyCommentIncrement(userId, commentId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentService.name, 400, 'Cant reply increment of comment'));
        }
    }

    async forwardCommentIncrement (userId: string, commentId: string): Promise<DomainComment> {
        try {
            return await this._service.forwardCommentIncrement(userId, commentId);
        } catch (e) {
            throw new DomainServiceErrorException(globalExceptionServiceErrorResponse(e, PostCommentService.name, 400, 'Cant forward increment of comment'));
        }
    }
}