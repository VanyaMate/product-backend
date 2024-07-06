import {
    DomainPostCreateData,
} from 'product-types/dist/post/DomainPostCreateData';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainPostUpdateData,
} from 'product-types/dist/post/DomainPostUpdateData';


export interface IPostService {
    create (userId: string, data: DomainPostCreateData): Promise<Array<NotificationServiceResponse>>;

    update (userId: string, postId: string, data: DomainPostUpdateData): Promise<Array<NotificationServiceResponse>>;

    remove (userId: string, postId: string): Promise<Array<NotificationServiceResponse>>;
}