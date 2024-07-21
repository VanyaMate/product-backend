import { IPostService } from '@/domain/services/post/post-service.interface';
import {
    DomainPostCreateData,
} from 'product-types/dist/post/DomainPostCreateData';
import {
    DomainPostUpdateData,
} from 'product-types/dist/post/DomainPostUpdateData';
import {
    NotificationServiceResponse,
} from '../../notification/types/NotificationServiceResponse';
import { PrismaClient } from '@prisma/client';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    prismaPostToDomain,
} from '@/domain/services/post/converters/prismaPostToDomain';
import {
    prismaUserToDomain,
} from '@/domain/services/user/converters/prismaUserToDomain';


export class PrismaPostService implements IPostService {
    constructor (private readonly _prisma: PrismaClient) {
    }

    async create (userId: string, data: DomainPostCreateData): Promise<NotificationServiceResponse[]> {
        const post = await this._prisma.post.create({
            data   : {
                authorId: userId,
                message : data.message,
            },
            include: {
                author: {
                    include: {
                        friendsTo  : true,
                        friendsFrom: true,
                        connections: { take: 1 },
                    },
                },
            },
        });

        const postData   = prismaPostToDomain(post, prismaUserToDomain(post.author));
        const friendsIds = [ ...post.author.friendsTo, ...post.author.friendsFrom ]
            .map(({ toUserId, fromUserId }) =>
                toUserId === userId ? fromUserId : toUserId,
            );

        return [
            [
                [ userId ],
                DomainNotificationType.POST_CREATED_IN,
                { post: postData },
            ],
            [
                friendsIds,
                DomainNotificationType.POST_CREATED_OUT,
                { post: postData },
            ],
        ];
    }

    async update (userId: string, postId: string, data: DomainPostUpdateData): Promise<NotificationServiceResponse[]> {
        const createdPost = await this._prisma.post.findFirst({
            where: {
                id      : postId,
                authorId: userId,
            },
        });

        if (!createdPost) {
            throw 'Post not found';
        }

        const post = await this._prisma.post.update(
            {
                where  : {
                    id      : postId,
                    authorId: userId,
                },
                data   : {
                    authorId: userId,
                    message : data.message,
                },
                include: {
                    author: {
                        include: {
                            friendsTo  : true,
                            friendsFrom: true,
                            connections: { take: 1 },
                        },
                    },
                },
            },
        );

        const previousPostData = prismaPostToDomain(createdPost, prismaUserToDomain(post.author));
        const postData         = prismaPostToDomain(post, prismaUserToDomain(post.author));
        const friendsIds       = [ ...post.author.friendsTo, ...post.author.friendsFrom ]
            .map(({ toUserId, fromUserId }) =>
                toUserId === userId ? fromUserId : toUserId,
            );

        return [
            [
                [ userId ],
                DomainNotificationType.POST_UPDATED_IN,
                {
                    previousPost: previousPostData,
                    newPost     : postData,
                },
            ],
            [
                friendsIds,
                DomainNotificationType.POST_UPDATED_OUT,
                {
                    previousPost: previousPostData,
                    newPost     : postData,
                },
            ],
        ];
    }

    async remove (userId: string, postId: string): Promise<NotificationServiceResponse[]> {
        const post = await this._prisma.post.findFirst({
            where  : {
                id      : postId,
                authorId: userId,
            },
            include: {
                author: {
                    include: {
                        friendsTo  : true,
                        friendsFrom: true,
                        connections: { take: 1 },
                    },
                },
            },
        });

        if (!post) {
            throw 'Post not found';
        }

        await this._prisma.post.deleteMany(
            {
                where: {
                    id      : postId,
                    authorId: userId,
                },
            },
        );

        const postData   = prismaPostToDomain(post, prismaUserToDomain(post.author));
        const friendsIds = [ ...post.author.friendsTo, ...post.author.friendsFrom ]
            .map(({ toUserId, fromUserId }) =>
                toUserId === userId ? fromUserId : toUserId,
            );

        return [
            [
                [ userId ],
                DomainNotificationType.POST_DELETED_IN,
                { post: postData },
            ],
            [
                friendsIds,
                DomainNotificationType.POST_DELETED_OUT,
                { post: postData },
            ],
        ];
    }
}