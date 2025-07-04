import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';
import {
    DomainCommentUpdateData,
} from 'product-types/dist/comment/DomainCommentUpdateData';
import { DomainComment } from 'product-types/dist/comment/DomainComment';


export interface IPostCommentService {
    createComment (userId: string, postId: string, createData: DomainCommentCreateData): Promise<DomainComment>;

    updateComment (userId: string, commentId: string, updateData: DomainCommentUpdateData): Promise<DomainComment>;

    removeComment (userId: string, commentId: string): Promise<DomainComment>;

    getComment (userId: string, commentId: string): Promise<DomainComment>;

    replyOnComment (userId: string, postId: string, commentId: string, createData: DomainCommentCreateData): Promise<DomainComment>;

    likeComment (userId: string, commentId: string): Promise<DomainComment>;

    dislikeComment (userId: string, commentId: string): Promise<DomainComment>;
}