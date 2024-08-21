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
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageData';
import {
    DomainNotificationUserMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageDeletedData';
import {
    DomainNotificationUserMessageRedactedData,
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageRedactedData';
import {
    DomainNotificationUserMessageReadData,
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageReadData';
import {
    DomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestData';
import {
    DomainNotificationFriendDeletedData,
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendDeletedData';
import {
    DomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestAcceptedData';
import {
    DomainNotificationFriendRequestCanceledData,
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestCanceledData';
import {
    DomainNotificationPrivateDialogueCreateData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueCreateData';
import {
    DomainNotificationPrivateDialogueDeletedData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueDeletedData';
import {
    DomainNotificationPrivateDialogueArchiveData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueArchiveData';
import {
    DomainNotificationPrivateDialogueUpdatedData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueUpdatedData';


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