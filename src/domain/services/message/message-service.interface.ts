import {
    DomainMessageType,
} from 'product-types/dist/message/DomainMessage';
import {
    DomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';
import {
    DomainNotificationUserMessageRedactedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageRedactedData';
import {
    DomainNotificationUserMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageDeletedData';


export interface IMessageService {
    send (authorId: string, dialogueId: string, messageType: DomainMessageType, messageBody: string): Promise<[ string[], DomainNotificationUserMessageData ]>;

    redact (messageId: string, newMessageBody: string): Promise<[ string[], DomainNotificationUserMessageRedactedData ]>;

    remove (messageId: string): Promise<[ string[], DomainNotificationUserMessageDeletedData ]>;
}