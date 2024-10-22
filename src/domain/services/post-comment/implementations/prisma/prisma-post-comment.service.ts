import {
    IPostCommentService,
} from '@/domain/services/post-comment/post-comment-service.interface';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';
import {
    DomainCommentUpdateData,
} from 'product-types/dist/comment/DomainCommentUpdateData';
import { DomainComment } from 'product-types/dist/comment/DomainComment';
import { PrismaClient } from '@prisma/client';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';

// TODO: Переделать. Капец как это не нравится

export class PrismaPostCommentService implements IPostCommentService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async createComment (userId: string, postId: string, createData: DomainCommentCreateData): Promise<DomainComment> {
        const comment = await this._prisma.postComment.create({
            data   : {
                authorId: userId,
                postId  : postId,
                comment : createData.comment,
            },
            include: {
                author: {
                    include: prismaToDomainUserInclude,
                },
            },
        });

        return {
            id          : comment.id,
            comment     : comment.comment,
            creationDate: +comment.creationDate,
            author      : prismaUserToDomain(comment.author),
            comments    : [],
            redacted    : false,
            liked       : false,
            likes       : 0,
            replies     : 0,
            forwards    : 0,
        };
    }

    async updateComment (userId: string, commentId: string, updateData: DomainCommentUpdateData): Promise<DomainComment> {
        const [ comment, liked ] = await Promise.all([
            this._prisma.postComment.update({
                where  : {
                    id: commentId,
                },
                data   : {
                    authorId: userId,
                    comment : updateData.comment,
                    redacted: true,
                },
                include: {
                    author : {
                        include: prismaToDomainUserInclude,
                    },
                    replies: {
                        include: {
                            author: {
                                include: prismaToDomainUserInclude,
                            },
                        },
                    },
                },
            }),
            this._prisma.postCommentLike.findFirst({
                where: {
                    postCommentId: commentId,
                    authorId     : userId,
                },
            }),
        ]);

        return {
            id          : comment.id,
            comment     : comment.comment,
            creationDate: +comment.creationDate,
            author      : prismaUserToDomain(comment.author),
            comments    : comment.replies.map((reply) => ({
                id          : reply.id,
                comment     : reply.comment,
                creationDate: +reply.creationDate,
                author      : prismaUserToDomain(reply.author),
                comments    : [],
                redacted    : reply.redacted,
                liked       : false,
                likes       : comment.likesAmount,
                replies     : comment.repliesAmount,
                forwards    : comment.forwardsAmount,
            })),
            redacted    : true,
            liked       : !!liked,
            likes       : comment.likesAmount,
            replies     : comment.repliesAmount,
            forwards    : comment.forwardsAmount,
        };
    }

    async removeComment (userId: string, commentId: string): Promise<DomainComment> {
        throw new Error('Method not implemented.');
    }

    async getComment (userId: string, commentId: string): Promise<DomainComment> {
        throw new Error('Method not implemented.');
    }

    async replyOnComment (userId: string, postId: string, commentId: string, createData: DomainCommentCreateData): Promise<DomainComment> {
        throw new Error('Method not implemented.');
    }

    async likeComment (userId: string, commentId: string): Promise<DomainComment> {
        throw new Error('Method not implemented.');
    }

    async dislikeComment (userId: string, commentId: string): Promise<DomainComment> {
        throw new Error('Method not implemented.');
    }

    async replyCommentIncrement (commentId: string): Promise<DomainComment> {
        throw new Error('Method not implemented.');
    }

    async forwardCommentIncrement (commentId: string): Promise<DomainComment> {
        throw new Error('Method not implemented.');
    }
}