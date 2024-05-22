import {
    DomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';
import {
    DomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestAcceptedData';
import {
    DomainNotificationFriendDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendDeletedData';
import {
    DomainNotificationFriendRequestCanceledData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestCanceledData';


export interface IFriendService {
    // Создает заявку (friend request)
    add (fromUserId: string, toUserId: string): Promise<[ string[], DomainNotificationFriendRequestData ]>;

    // Создает связь (friend)
    accept (fromUserId: string, requestId: string): Promise<[ string[], DomainNotificationFriendRequestAcceptedData ]>;

    // Удаляет связь (friend)
    remove (fromUserId: string, removedUserId: string): Promise<[ string[], DomainNotificationFriendDeletedData ]>;

    // Отменяет заявку (friend request)
    cancel (fromUserId: string, requestId: string): Promise<[ string[], DomainNotificationFriendRequestCanceledData ]>;
}