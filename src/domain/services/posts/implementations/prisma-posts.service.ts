import { IPostsService } from '@/domain/services/posts/posts-service.interface';
import { PrismaClient } from '@prisma/client';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import {
    DomainSearchCursorOptions,
} from 'product-types/dist/search/DomainSearchCursorOptions';
import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    prismaDomainUserSelector,
} from '@/domain/services/user/selectors/prisma/prisma-domain-user.selector';
import {
    prismaPostToDomain,
} from '@/domain/services/post/converters/prismaPostToDomain';


export class PrismaPostsService implements IPostsService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async getByUserId (userId: string, options: DomainSearchItemOptions): Promise<DomainSearchItem> {
        const [ posts, count ] = await this._prisma.$transaction([
            this._prisma.post.findMany({
                where  : {
                    authorId: userId,
                    message : {
                        contains: options.query,
                    },
                },
                skip   : options.offset,
                take   : options.limit,
                include: {
                    author: {
                        select: prismaDomainUserSelector,
                    },
                },
            }),
            this._prisma.post.count({
                where: {
                    authorId: userId,
                    message : {
                        contains: options.query,
                    },
                },
            }),
        ]);

        return {
            list: posts.map((post) => prismaPostToDomain(post, post.author)),
            count,
        };
    }

    async getByUserIdWithCursor (userId: string, options: DomainSearchCursorOptions): Promise<DomainSearchItem> {
        const [ posts, count ] = await this._prisma.$transaction([
            this._prisma.post.findMany({
                where  : {
                    authorId: userId,
                    message : {
                        contains: options.query,
                    },
                },
                cursor : {
                    id: options.cursor,
                },
                take   : options.limit,
                include: {
                    author: {
                        select: prismaDomainUserSelector,
                    },
                },
            }),
            this._prisma.post.count({
                where: {
                    authorId: userId,
                    message : {
                        contains: options.query,
                    },
                },
            }),
        ]);

        return {
            list: posts.map((post) => prismaPostToDomain(post, post.author)),
            count,
        };
    }

    async getById (postId: string): Promise<DomainPost> {
        const post = await this._prisma.post.findFirst({
            where  : {
                id: postId,
            },
            include: {
                author: {
                    select: prismaDomainUserSelector,
                },
            },
        });

        return prismaPostToDomain(post, post.author);
    }

}