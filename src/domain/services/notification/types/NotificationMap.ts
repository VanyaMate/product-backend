import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    DomainNotificationPrivateDialogueUpdatedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueUpdatedData';
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


export type NotificationMap = {
    [DomainNotificationType.FRIEND_REQUEST_IN]: DomainNotificationFriendRequestData,
    [DomainNotificationType.FRIEND_REQUEST_OUT]: DomainNotificationFriendRequestData,
    [DomainNotificationType.FRIEND_DELETED_IN]: DomainNotificationFriendDeletedData,
    [DomainNotificationType.FRIEND_DELETED_OUT]: DomainNotificationFriendDeletedData,
    [DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN]: DomainNotificationFriendRequestAcceptedData,
    [DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT]: DomainNotificationFriendRequestAcceptedData,
    [DomainNotificationType.FRIEND_REQUEST_CANCELED_IN]: DomainNotificationFriendRequestCanceledData,
    [DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT]: DomainNotificationFriendRequestCanceledData,

    [DomainNotificationType.DIALOGUE_CREATED_IN]: void,
    [DomainNotificationType.DIALOGUE_CREATED_OUT]: void,
    [DomainNotificationType.DIALOGUE_UPDATED_IN]: void,
    [DomainNotificationType.DIALOGUE_UPDATED_OUT]: void,
    [DomainNotificationType.DIALOGUE_DELETED_IN]: void,
    [DomainNotificationType.DIALOGUE_DELETED_OUT]: void,
    [DomainNotificationType.DIALOGUE_ARCHIVED_IN]: void,
    [DomainNotificationType.DIALOGUE_ARCHIVED_OUT]: void,

    [DomainNotificationType.PRIVATE_DIALOGUE_CREATED_IN]: DomainNotificationPrivateDialogueCreateData,
    [DomainNotificationType.PRIVATE_DIALOGUE_CREATED_OUT]: DomainNotificationPrivateDialogueCreateData,
    [DomainNotificationType.PRIVATE_DIALOGUE_UPDATED_IN]: DomainNotificationPrivateDialogueUpdatedData,
    [DomainNotificationType.PRIVATE_DIALOGUE_UPDATED_OUT]: DomainNotificationPrivateDialogueUpdatedData,
    [DomainNotificationType.PRIVATE_DIALOGUE_DELETED_IN]: DomainNotificationPrivateDialogueDeletedData,
    [DomainNotificationType.PRIVATE_DIALOGUE_DELETED_OUT]: DomainNotificationPrivateDialogueDeletedData,
    [DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_IN]: DomainNotificationPrivateDialogueCreateData,
    [DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_OUT]: DomainNotificationPrivateDialogueDeletedData,
    [DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_IN]: DomainNotificationPrivateDialogueArchiveData,
    [DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_OUT]: DomainNotificationPrivateDialogueArchiveData,
    [DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_IN]: DomainNotificationPrivateDialogueArchiveData,
    [DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_OUT]: DomainNotificationPrivateDialogueArchiveData,
}