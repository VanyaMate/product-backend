import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    DomainNotificationLanguageCreateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageCreateData';
import {
    DomainNotificationLanguageUpdateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageUpdateData';
import {
    DomainNotificationLanguageDeletedData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageDeletedData';
import {
    DomainNotificationLanguageWordCreateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageWordCreateData';
import {
    DomainNotificationLanguageFolderCreateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageFolderCreateData';
import {
    DomainNotificationLanguageFolderUpdateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageFolderUpdateData';
import {
    DomainNotificationLanguageFolderDeletedData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageFolderDeletedData';
import {
    DomainNotificationLanguageWordUpdateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageWordUpdateData';
import {
    DomainNotificationLanguageWordDeletedData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageWordDeletedData';
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
    DomainNotificationPrivateMessageData,
} from 'product-types/dist/notification/notification-data-types/private-message/DomainNotificationPrivateMessageData';
import {
    DomainNotificationPrivateMessageReadData,
} from 'product-types/dist/notification/notification-data-types/private-message/DomainNotificationPrivateMessageReadData';
import {
    DomainNotificationPrivateMessageRedactedData,
} from 'product-types/dist/notification/notification-data-types/private-message/DomainNotificationPrivateMessageRedactedData';
import {
    DomainNotificationPrivateMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/private-message/DomainNotificationPrivateMessageDeletedData';
import {
    DomainNotificationPrivateMessageReadAllData,
} from 'product-types/dist/notification/notification-data-types/private-message/DomainNotificationPrivateMessageReadAllData';
import {
    DomainNotificationPrivateDialogueCreateData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueCreateData';
import {
    DomainNotificationPrivateDialogueUpdatedData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueUpdatedData';
import {
    DomainNotificationPrivateDialogueDeletedData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueDeletedData';
import {
    DomainNotificationPrivateDialogueArchiveData,
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueArchiveData';
import {
    DomainNotificationPostCreateData,
} from 'product-types/dist/notification/notification-data-types/post/DomainNotificationPostCreateData';
import {
    DomainNotificationPostUpdatedData,
} from 'product-types/dist/notification/notification-data-types/post/DomainNotificationPostUpdatedData';
import {
    DomainNotificationPostDeletedData,
} from 'product-types/dist/notification/notification-data-types/post/DomainNotificationPostDeletedData';
import {
    DomainNotificationFileUploadedData,
} from 'product-types/dist/notification/notification-data-types/file/DomainNotificationFileUploadedData';
import {
    DomainNotificationFileUpdatedData,
} from 'product-types/dist/notification/notification-data-types/file/DomainNotificationFileUpdatedData';
import {
    DomainNotificationFileDeletedData,
} from 'product-types/dist/notification/notification-data-types/file/DomainNotificationFileDeletedData';
import {
    DomainNotificationUserAvatarUpdateData,
} from 'product-types/dist/notification/notification-data-types/user/DomainNotificationUserAvatarUpdateData';
import {
    DomainNotificationUserLoginUpdateData,
} from 'product-types/dist/notification/notification-data-types/user/DomainNotificationUserLoginUpdateData';
import {
    DomainNotificationUserBackgroundUpdateData,
} from 'product-types/dist/notification/notification-data-types/user/DomainNotificationUserBackgroundUpdateData';
import {
    DomainNotificationUserContactInfoUpdateData,
} from 'product-types/dist/notification/notification-data-types/user/DomainNotificationUserContactInfoUpdateData';
import {
    DomainNotificationUserPermissionsUpdateData,
} from 'product-types/dist/notification/notification-data-types/user/DomainNotificationUserPermissionsUpdateData';


export type NotificationMap = {
    [DomainNotificationType.PASSWORD_UPDATE]: void;
    [DomainNotificationType.NOTIFICATIONS_STATE_UPDATE]: boolean;

    [DomainNotificationType.USER_AVATAR_UPDATE_IN]: DomainNotificationUserAvatarUpdateData,
    [DomainNotificationType.USER_AVATAR_UPDATE_OUT]: DomainNotificationUserAvatarUpdateData,
    [DomainNotificationType.USER_LOGIN_UPDATE_IN]: DomainNotificationUserLoginUpdateData,
    [DomainNotificationType.USER_LOGIN_UPDATE_OUT]: DomainNotificationUserLoginUpdateData,
    [DomainNotificationType.USER_BACKGROUND_UPDATE_IN]: DomainNotificationUserBackgroundUpdateData,
    [DomainNotificationType.USER_BACKGROUND_UPDATE_OUT]: DomainNotificationUserBackgroundUpdateData,
    [DomainNotificationType.USER_CONTACTS_UPDATE_IN]: DomainNotificationUserContactInfoUpdateData,
    [DomainNotificationType.USER_CONTACTS_UPDATE_OUT]: DomainNotificationUserContactInfoUpdateData,
    [DomainNotificationType.USER_PERMISSIONS_UPDATE_IN]: DomainNotificationUserPermissionsUpdateData,
    [DomainNotificationType.USER_PERMISSIONS_UPDATE_OUT]: DomainNotificationUserPermissionsUpdateData,

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

    [DomainNotificationType.PRIVATE_MESSAGE_IN]: DomainNotificationPrivateMessageData,
    [DomainNotificationType.PRIVATE_MESSAGE_OUT]: DomainNotificationPrivateMessageData,
    [DomainNotificationType.PRIVATE_MESSAGE_READ_IN]: DomainNotificationPrivateMessageReadData,
    [DomainNotificationType.PRIVATE_MESSAGE_READ_OUT]: DomainNotificationPrivateMessageReadData,
    [DomainNotificationType.PRIVATE_MESSAGE_REDACTED_IN]: DomainNotificationPrivateMessageRedactedData,
    [DomainNotificationType.PRIVATE_MESSAGE_REDACTED_OUT]: DomainNotificationPrivateMessageRedactedData,
    [DomainNotificationType.PRIVATE_MESSAGE_DELETED_IN]: DomainNotificationPrivateMessageDeletedData,
    [DomainNotificationType.PRIVATE_MESSAGE_DELETED_OUT]: DomainNotificationPrivateMessageDeletedData,
    [DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_IN]: DomainNotificationPrivateMessageReadAllData,
    [DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_OUT]: DomainNotificationPrivateMessageReadAllData,

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

    [DomainNotificationType.POST_CREATED_IN]: DomainNotificationPostCreateData,
    [DomainNotificationType.POST_CREATED_OUT]: DomainNotificationPostCreateData,
    [DomainNotificationType.POST_UPDATED_IN]: DomainNotificationPostUpdatedData,
    [DomainNotificationType.POST_UPDATED_OUT]: DomainNotificationPostUpdatedData,
    [DomainNotificationType.POST_DELETED_IN]: DomainNotificationPostDeletedData,
    [DomainNotificationType.POST_DELETED_OUT]: DomainNotificationPostDeletedData,

    [DomainNotificationType.FILE_UPLOADED_IN]: DomainNotificationFileUploadedData,
    [DomainNotificationType.FILE_UPLOADED_OUT]: DomainNotificationFileUploadedData,
    [DomainNotificationType.FILE_UPDATED_IN]: DomainNotificationFileUpdatedData,
    [DomainNotificationType.FILE_UPDATED_OUT]: DomainNotificationFileUpdatedData,
    [DomainNotificationType.FILE_DELETED_IN]: DomainNotificationFileDeletedData,
    [DomainNotificationType.FILE_DELETED_OUT]: DomainNotificationFileDeletedData,

    [DomainNotificationType.LANGUAGE_CREATED_IN]: DomainNotificationLanguageCreateData,
    [DomainNotificationType.LANGUAGE_CREATED_OUT]: DomainNotificationLanguageCreateData,
    [DomainNotificationType.LANGUAGE_UPDATED_IN]: DomainNotificationLanguageUpdateData,
    [DomainNotificationType.LANGUAGE_UPDATED_OUT]: DomainNotificationLanguageUpdateData,
    [DomainNotificationType.LANGUAGE_DELETED_IN]: DomainNotificationLanguageDeletedData,
    [DomainNotificationType.LANGUAGE_DELETED_OUT]: DomainNotificationLanguageDeletedData,

    [DomainNotificationType.LANGUAGE_FOLDER_CREATED_IN]: DomainNotificationLanguageFolderCreateData,
    [DomainNotificationType.LANGUAGE_FOLDER_CREATED_OUT]: DomainNotificationLanguageFolderCreateData,
    [DomainNotificationType.LANGUAGE_FOLDER_UPDATED_IN]: DomainNotificationLanguageFolderUpdateData,
    [DomainNotificationType.LANGUAGE_FOLDER_UPDATED_OUT]: DomainNotificationLanguageFolderUpdateData,
    [DomainNotificationType.LANGUAGE_FOLDER_DELETED_IN]: DomainNotificationLanguageFolderDeletedData,
    [DomainNotificationType.LANGUAGE_FOLDER_DELETED_OUT]: DomainNotificationLanguageFolderDeletedData,

    [DomainNotificationType.LANGUAGE_WORD_CREATED_IN]: DomainNotificationLanguageWordCreateData,
    [DomainNotificationType.LANGUAGE_WORD_CREATED_OUT]: DomainNotificationLanguageWordCreateData,
    [DomainNotificationType.LANGUAGE_WORD_UPDATED_IN]: DomainNotificationLanguageWordUpdateData,
    [DomainNotificationType.LANGUAGE_WORD_UPDATED_OUT]: DomainNotificationLanguageWordUpdateData,
    [DomainNotificationType.LANGUAGE_WORD_DELETED_IN]: DomainNotificationLanguageWordDeletedData,
    [DomainNotificationType.LANGUAGE_WORD_DELETED_OUT]: DomainNotificationLanguageWordDeletedData,
}