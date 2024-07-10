import { DomainPost } from 'product-types/dist/post/DomainPost';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    DomainSearchCursorOptions,
} from 'product-types/dist/search/DomainSearchCursorOptions';
import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';


export interface IPostsService {
    getByUserId (userId: string, options: DomainSearchItemOptions): Promise<DomainSearchItem>;

    getByUserIdWithCursor (userId: string, options: DomainSearchCursorOptions): Promise<DomainSearchItem>;

    getById (postId: string): Promise<DomainPost>;
}