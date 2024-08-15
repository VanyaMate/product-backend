import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import { DomainCallAnswer } from 'product-types/dist/call/DomainCallAnswer';


export interface ICallService {
    offer (userId: string, toUserId: string, offer: DomainCallOffer): Promise<Array<NotificationServiceResponse>>;

    answer (userId: string, toUserId: string, answer: DomainCallAnswer): Promise<Array<NotificationServiceResponse>>;

    start (userId: string, toUserId: string): Promise<Array<NotificationServiceResponse>>;

    finish (userId: string, toUserId: string): Promise<Array<NotificationServiceResponse>>;
}
