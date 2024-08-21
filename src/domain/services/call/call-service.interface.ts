import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import { DomainCallAnswer } from 'product-types/dist/call/DomainCallAnswer';


export interface ICallService {
    offer (userId: string, callId: string, offer: DomainCallOffer, connectionId: string): Promise<Array<NotificationServiceResponse>>;

    answer (userId: string, callId: string, answer: DomainCallAnswer): Promise<Array<NotificationServiceResponse>>;

    start (userId: string, toUserId: string, connectionId: string): Promise<Array<NotificationServiceResponse>>;

    finish (userId: string, callId: string): Promise<Array<NotificationServiceResponse>>;
}
