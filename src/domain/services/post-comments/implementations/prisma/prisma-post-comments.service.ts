import {
    IPostCommentsService,
} from '@/domain/services/post-comments/post-comments-service.interface';
import { PrismaClient } from '@prisma/client';
import { DomainComment } from 'product-types/dist/comment/DomainComment';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';
import {
    prismaPostCommentToDomain,
} from '@/domain/services/post-comment/implementations/prisma/converters/prismaPostCommentToDomain';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';


export class PrismaPostCommentsService implements IPostCommentsService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async getCommentReplies (userId: string, commentId: string, take: number = 3, skip: number = 0): Promise<DomainComment[]> {
        const comments = await this._prisma.postComment.findMany({
            where  : {
                replyId: commentId,
            },
            include: {
                author: {
                    include: prismaToDomainUserInclude,
                },
                /*replies: {
                 include: {
                 author: {
                 include: prismaToDomainUserInclude,
                 },
                 likes : {
                 where: {
                 authorId: userId,
                 },
                 },
                 },
                 take   : 1,
                 skip   : 0,
                 orderBy: {
                 likes: {
                 _count: 'desc',
                 },
                 },
                 },*/
                likes: {
                    where: {
                        authorId: userId,
                    },
                },
            },
            take   : take,
            skip   : skip,
            orderBy: {
                likes: {
                    _count: 'desc',
                },
            },
        });

        return comments.map((comment) => {
            return prismaPostCommentToDomain(
                comment,
                prismaUserToDomain(comment.author),
                /*comment.replies.map((reply) => prismaPostCommentToDomain(reply, prismaUserToDomain(reply.author))),*/
            );
        });
    }

    async getCommentRepliesByCursor (userId: string, commentId: string, cursor: string, take: number = 3): Promise<DomainComment[]> {
        const comments = await this._prisma.postComment.findMany({
            where  : {
                replyId: commentId,
            },
            include: {
                author: {
                    include: prismaToDomainUserInclude,
                },
                /*                replies: {
                 include: {
                 author: {
                 include: prismaToDomainUserInclude,
                 },
                 likes : {
                 where: {
                 authorId: userId,
                 },
                 },
                 },
                 take   : 1,
                 skip   : 0,
                 orderBy: {
                 likes: {
                 _count: 'desc',
                 },
                 },
                 },*/
                likes: {
                    where: {
                        authorId: userId,
                    },
                },
            },
            take   : take,
            skip   : 1,
            cursor : {
                id: cursor,
            },
            orderBy: {
                likes: {
                    _count: 'desc',
                },
            },
        });

        return comments.map((comment) => {
            return prismaPostCommentToDomain(
                comment,
                prismaUserToDomain(comment.author),
                /*comment.replies.map((reply) => prismaPostCommentToDomain(reply, prismaUserToDomain(reply.author))),*/
            );
        });
    }
}