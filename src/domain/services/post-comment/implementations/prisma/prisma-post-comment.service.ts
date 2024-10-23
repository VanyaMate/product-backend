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
    prismaPostCommentToDomain,
} from '@/domain/services/post-comment/implementations/prisma/converters/prismaPostCommentToDomain';
import {
    prismaUserToDomain,
} from '@/domain/services/users/converters/prismaUserToDomain';
import {
    prismaToDomainUserInclude,
} from '@/domain/services/users/include/prisma/prisma-domain-user.include';


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

        return prismaPostCommentToDomain(
            Object.assign(comment, { likes: [] }),
            prismaUserToDomain(comment.author),
        );
    }

    async updateComment (userId: string, commentId: string, updateData: DomainCommentUpdateData): Promise<DomainComment> {
        const comment = await this._prisma.postComment.update({
            where  : {
                id      : commentId,
                authorId: userId,
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
                        likes : {
                            where: {
                                authorId: userId,
                            },
                        },
                    },
                },
                likes  : {
                    where: {
                        authorId: userId,
                    },
                },
            },
        });

        return prismaPostCommentToDomain(
            comment,
            prismaUserToDomain(comment.author),
            comment.replies.map((reply) => prismaPostCommentToDomain(reply, prismaUserToDomain(reply.author))),
        );
    }

    async removeComment (userId: string, commentId: string): Promise<DomainComment> {
        const comment = await this._prisma.postComment.delete({
            where  : {
                id: commentId,
            },
            include: {
                author: {
                    include: prismaToDomainUserInclude,
                },
            },
        });

        return prismaPostCommentToDomain(
            Object.assign(comment, { likes: [] }),
            prismaUserToDomain(comment.author),
        );
    }

    async getComment (userId: string, commentId: string): Promise<DomainComment> {
        const comment = await this._prisma.postComment.findFirst({
            where  : {
                id: commentId,
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
                        likes : {
                            where: {
                                authorId: userId,
                            },
                        },
                    },
                },
                likes  : {
                    where: {
                        authorId: userId,
                    },
                },
            },
        });

        if (!comment) {
            throw new Error('Comment not found');
        }

        return prismaPostCommentToDomain(
            comment,
            prismaUserToDomain(comment.author),
            comment.replies.map((reply) => prismaPostCommentToDomain(reply, prismaUserToDomain(reply.author))),
        );
    }

    async replyOnComment (userId: string, postId: string, commentId: string, createData: DomainCommentCreateData): Promise<DomainComment> {
        const comment = await this._prisma.postComment.create({
            data   : {
                authorId: userId,
                replyId : commentId,
                postId  : postId,
                comment : createData.comment,
            },
            include: {
                author: {
                    include: prismaToDomainUserInclude,
                },
            },
        });

        return prismaPostCommentToDomain(
            Object.assign(comment, { likes: [] }),
            prismaUserToDomain(comment.author),
        );
    }

    async likeComment (userId: string, commentId: string): Promise<DomainComment> {
        const [ comment ] = await this._prisma.$transaction([
            this._prisma.postComment.update({
                where  : {
                    id   : commentId,
                    likes: {
                        none: {
                            authorId: userId,
                        },
                    },
                },
                data   : {
                    likesAmount: {
                        increment: 1,
                    },
                },
                include: {
                    author: {
                        include: prismaToDomainUserInclude,
                    },
                },
            }),
            this._prisma.postCommentLike.create({
                data: {
                    postCommentId: commentId,
                    authorId     : userId,
                },
            }),
        ]);

        /**
         * Передается null, потому что внутри функции считается длина
         * и если длина >0 -> считается, как liked
         *
         * Да, костыль. Увы.
         */
        return prismaPostCommentToDomain(
            Object.assign(comment, { likes: [ null ] }),
            prismaUserToDomain(comment.author),
        );
    }

    async dislikeComment (userId: string, commentId: string): Promise<DomainComment> {
        const [ comment ] = await this._prisma.$transaction([
            this._prisma.postComment.update({
                where  : {
                    id   : commentId,
                    likes: {
                        some: {
                            authorId: userId,
                        },
                    },
                },
                data   : {
                    likesAmount: {
                        decrement: 1,
                    },
                },
                include: {
                    author: {
                        include: prismaToDomainUserInclude,
                    },
                },
            }),
            this._prisma.postCommentLike.deleteMany({
                where: {
                    postCommentId: commentId,
                    authorId     : userId,
                },
            }),
        ]);

        return prismaPostCommentToDomain(
            Object.assign(comment, { likes: [] }),
            prismaUserToDomain(comment.author),
        );
    }

    async replyCommentIncrement (userId: string, commentId: string): Promise<DomainComment> {
        const comment = await this._prisma.postComment.update({
            where  : {
                id: commentId,
            },
            data   : {
                repliesAmount: {
                    increment: 1,
                },
            },
            include: {
                author: {
                    include: prismaToDomainUserInclude,
                },
            },
        });

        return prismaPostCommentToDomain(
            Object.assign(comment, { likes: [] }),
            prismaUserToDomain(comment.author),
        );
    }

    async forwardCommentIncrement (userId: string, commentId: string): Promise<DomainComment> {
        const comment = await this._prisma.postComment.update({
            where  : {
                id: commentId,
            },
            data   : {
                forwardsAmount: {
                    increment: 1,
                },
            },
            include: {
                author: {
                    include: prismaToDomainUserInclude,
                },
            },
        });

        return prismaPostCommentToDomain(
            Object.assign(comment, { likes: [] }),
            prismaUserToDomain(comment.author),
        );
    }
}