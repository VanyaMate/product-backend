import {
    DomainMessageType,
} from 'product-types/dist/message/DomainMessage';
import {
    DomainNotificationUserMessageDeletedData
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageDeletedData';
import {
    DomainNotificationUserMessageData
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageData';
import {
    DomainNotificationUserMessageRedactedData
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageRedactedData';


export interface IMessageService {
    send (authorId: string, dialogueId: string, messageType: DomainMessageType, messageBody: string): Promise<[ string[], DomainNotificationUserMessageData ]>;

    redact (messageId: string, newMessageBody: string): Promise<[ string[], DomainNotificationUserMessageRedactedData ]>;

    remove (messageId: string): Promise<[ string[], DomainNotificationUserMessageDeletedData ]>;
}