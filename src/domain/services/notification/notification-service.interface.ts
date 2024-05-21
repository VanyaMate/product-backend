import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    DomainNotificationErrorData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationErrorData';
import {
    DomainNotificationDisconnectedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationDisconnectedData';
import {
    DomainNotificationTokensUpdateData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationTokensUpdateData';
import {
    DomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';
import {
    DomainNotificationUserMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageDeletedData';
import {
    DomainNotificationUserMessageRedactedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageRedactedData';
import {
    DomainNotificationUserMessageReadData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageReadData';
import {
    DomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';
import {
    DomainNotificationFriendDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendDeletedData';
import {
    DomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestAcceptedData';
import {
    DomainNotificationFriendRequestCanceledData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestCanceledData';


export interface INotificationService {
    error (userId: string, data: DomainNotificationErrorData): Promise<DomainNotification>;

    connected (userId: string): Promise<DomainNotification>;

    connecting (userId: string): Promise<DomainNotification>;

    disconnected (userId: string, data: DomainNotificationDisconnectedData): Promise<DomainNotification>;

    tokensUpdate (userId: string, data: DomainNotificationTokensUpdateData): Promise<DomainNotification>;

    userMessage (userId: string, data: DomainNotificationUserMessageData): Promise<DomainNotification>;

    userMessageDeleted (userId: string, data: DomainNotificationUserMessageDeletedData): Promise<DomainNotification>;

    userMessageRedacted (userId: string, data: DomainNotificationUserMessageRedactedData): Promise<DomainNotification>;

    userMessageRead (userId: string, data: DomainNotificationUserMessageReadData): Promise<DomainNotification>;

    friendRequest (userId: string, data: DomainNotificationFriendRequestData): Promise<DomainNotification>;

    friendDeleted (userId: string, data: DomainNotificationFriendDeletedData): Promise<DomainNotification>;

    friendRequestAccepted (userId: string, data: DomainNotificationFriendRequestAcceptedData): Promise<DomainNotification>;

    friendRequestCanceled (userId: string, data: DomainNotificationFriendRequestCanceledData): Promise<DomainNotification>;
}