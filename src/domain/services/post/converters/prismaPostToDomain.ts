import { Post } from '@prisma/client';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import { DomainUser } from 'product-types/dist/user/DomainUser';


export const prismaPostToDomain = function (post: Post, author: DomainUser): DomainPost {
    return {
        id          : post.id,
        redacted    : post.redacted,
        message     : post.message,
        creationData: post.creationDate.toUTCString(),
        author,
    };
};