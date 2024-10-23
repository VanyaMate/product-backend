import { PostComment, PostCommentLike } from '@prisma/client';
import { DomainComment } from 'product-types/dist/comment/DomainComment';
import { DomainUser } from 'product-types/dist/user/DomainUser';


export const prismaPostCommentToDomain = function (postComment: PostComment & {
    likes?: Array<PostCommentLike>
}, author: DomainUser, comments: Array<DomainComment> = []): DomainComment {
    return {
        id            : postComment.id,
        comment       : postComment.comment,
        creationDate  : +postComment.creationDate,
        author        : author,
        comments      : comments,
        redacted      : postComment.redacted,
        liked         : !!postComment.likes?.length,
        likesAmount   : postComment.likesAmount,
        repliesAmount : postComment.repliesAmount,
        forwardsAmount: postComment.forwardsAmount,
    };
};