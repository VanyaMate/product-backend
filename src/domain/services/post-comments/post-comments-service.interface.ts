import { DomainComment } from 'product-types/dist/comment/DomainComment';


export interface IPostCommentsService {
    getCommentReplies (userId: string, commentId: string, take: number, skip: number): Promise<DomainComment[]>;

    getCommentRepliesByCursor (userId: string, commentId: string, cursor: string, take: number): Promise<Array<DomainComment>>;
}