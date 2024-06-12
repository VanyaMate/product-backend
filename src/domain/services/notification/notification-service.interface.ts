import {
    DomainNotification, DomainNotificationType,
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
import {
    DomainNotificationPrivateDialogueCreateData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueCreateData';
import {
    DomainNotificationPrivateDialogueDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueDeletedData';
import {
    DomainNotificationPrivateDialogueArchiveData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueArchiveData';
import {
    DomainNotificationPrivateDialogueUpdatedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueUpdatedData';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';


export interface INotificationService {
    send (notifications: Array<NotificationServiceResponse>): Promise<void>;

    error (userId: string, data: DomainNotificationErrorData): Promise<DomainNotification>;

    connected (userId: string): Promise<DomainNotification>;

    connecting (userId: string): Promise<DomainNotification>;

    disconnected (userId: string, data: DomainNotificationDisconnectedData): Promise<DomainNotification>;

    tokensUpdate (userId: string, data: DomainNotificationTokensUpdateData): Promise<DomainNotification>;

    userMessageIn (userId: string, data: DomainNotificationUserMessageData): Promise<DomainNotification>;

    userMessageOut (userId: string, data: DomainNotificationUserMessageData): Promise<DomainNotification>;

    userMessageDeletedIn (userId: string, data: DomainNotificationUserMessageDeletedData): Promise<DomainNotification>;

    userMessageDeletedOut (userId: string, data: DomainNotificationUserMessageDeletedData): Promise<DomainNotification>;

    userMessageRedactedIn (userId: string, data: DomainNotificationUserMessageRedactedData): Promise<DomainNotification>;

    userMessageRedactedOut (userId: string, data: DomainNotificationUserMessageRedactedData): Promise<DomainNotification>;

    userMessageReadIn (userId: string, data: DomainNotificationUserMessageReadData): Promise<DomainNotification>;

    userMessageReadOut (userId: string, data: DomainNotificationUserMessageReadData): Promise<DomainNotification>;

    friendRequestIn (userId: string, data: DomainNotificationFriendRequestData): Promise<DomainNotification>;

    friendRequestOut (userId: string, data: DomainNotificationFriendRequestData): Promise<DomainNotification>;

    friendDeletedIn (userId: string, data: DomainNotificationFriendDeletedData): Promise<DomainNotification>;

    friendDeletedOut (userId: string, data: DomainNotificationFriendDeletedData): Promise<DomainNotification>;

    friendRequestAcceptedIn (userId: string, data: DomainNotificationFriendRequestAcceptedData): Promise<DomainNotification>;

    friendRequestAcceptedOut (userId: string, data: DomainNotificationFriendRequestAcceptedData): Promise<DomainNotification>;

    friendRequestCanceledIn (userId: string, data: DomainNotificationFriendRequestCanceledData): Promise<DomainNotification>;

    friendRequestCanceledOut (userId: string, data: DomainNotificationFriendRequestCanceledData): Promise<DomainNotification>;

    privateDialogueCreatedIn (userId: string, data: DomainNotificationPrivateDialogueCreateData): Promise<DomainNotification>;

    privateDialogueCreatedOut (userId: string, data: DomainNotificationPrivateDialogueCreateData): Promise<DomainNotification>;

    privateDialogueDeletedIn (userId: string, data: DomainNotificationPrivateDialogueDeletedData): Promise<DomainNotification>;

    privateDialogueDeletedOut (userId: string, data: DomainNotificationPrivateDialogueDeletedData): Promise<DomainNotification>;

    privateDialogueArchivedIn (userId: string, data: DomainNotificationPrivateDialogueArchiveData): Promise<DomainNotification>;

    privateDialogueArchivedOut (userId: string, data: DomainNotificationPrivateDialogueArchiveData): Promise<DomainNotification>;

    privateDialogueUpdatedIn (userId: string, data: DomainNotificationPrivateDialogueUpdatedData): Promise<DomainNotification>;

    privateDialogueUpdatedOut (userId: string, data: DomainNotificationPrivateDialogueUpdatedData): Promise<DomainNotification>;
}