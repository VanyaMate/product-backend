import {
    DomainNotification,
    DomainNotificationType,
    isDomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import { not } from 'rxjs/internal/util/not';


export const notificationFactory = function (notification: unknown): DomainNotification {
    if (isDomainNotification(notification)) {
        return {
            id          : notification.id,
            data        : notification.data,
            type        : notification.type,
            creationDate: typeof notification.creationDate === 'number'
                          ? notification.creationDate
                          : (notification.creationDate as Date).getTime(),
            viewed      : notification.viewed,
        };
    }

    return {
        id          : '',
        data        : notification,
        creationDate: Date.now(),
        type        : DomainNotificationType.UNKNOWN,
        viewed      : false,
    };
};