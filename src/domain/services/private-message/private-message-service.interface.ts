import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainMessageCreateData,
} from 'product-types/dist/message/DomainMessageCreateData';
import {
    DomainMessageUpdateData,
} from 'product-types/dist/message/DomainMessageUpdateData';


export interface IPrivateMessageService {
    send (userId: string, dialogueId: string, messageCreateData: DomainMessageCreateData): Promise<Array<NotificationServiceResponse>>;

    redact (userId: string, messageId: string, messageUpdateData: DomainMessageUpdateData): Promise<Array<NotificationServiceResponse>>;

    remove (userId: string, messageId: string): Promise<Array<NotificationServiceResponse>>;

    read (userId: string, messageId: string): Promise<Array<NotificationServiceResponse>>;

    readAll (userId: string, dialogueId: string): Promise<Array<NotificationServiceResponse>>;
}