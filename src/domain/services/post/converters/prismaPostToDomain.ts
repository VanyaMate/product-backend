import { Post, PostLike } from '@prisma/client';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import { DomainComment } from 'product-types/dist/comment/DomainComment';


export const prismaPostToDomain = function (post: Post & {
    likes?: Array<PostLike>
}, author: DomainUser, comments: Array<DomainComment>): DomainPost {
    return {
        id            : post.id,
        redacted      : post.redacted,
        message       : post.message,
        creationData  : post.creationDate.getTime(),
        liked         : !!post.likes?.length,
        likesAmount   : post.likesAmount,
        commentsAmount: post.commentsAmount,
        forwardsAmount: post.forwardsAmount,
        comments      : comments,
        author,
    };
};