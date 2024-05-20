import {
    DomainNotification,
    DomainNotificationType,
    isDomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import { not } from 'rxjs/internal/util/not';


export const notificationFactory = function (notification: unknown): DomainNotification {
    if (isDomainNotification(notification)) {
        console.log('is domain notification', notification);
        return {
            id          : notification.id,
            data        : notification.data,
            type        : notification.type,
            creationDate: notification.creationDate,
        };
    }

    return {
        id          : '',
        data        : notification,
        creationDate: new Date().toUTCString(),
        type        : DomainNotificationType.UNKNOWN,
    };
};