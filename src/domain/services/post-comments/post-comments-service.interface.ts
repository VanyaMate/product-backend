import { DomainComment } from 'product-types/dist/comment/DomainComment';


export interface IPostCommentsService {
    getComments (userId: string, postId: string, take: number, skip: number): Promise<Array<DomainComment>>;

    getCommentsByCursor (userId: string, postId: string, cursor: string, take: number): Promise<Array<DomainComment>>;

    getCommentReplies (userId: string, commentId: string, take: number, skip: number): Promise<Array<DomainComment>>;

    getCommentRepliesByCursor (userId: string, commentId: string, cursor: string, take: number): Promise<Array<DomainComment>>;
}