import {
    NotificationMap,
} from '@/domain/services/notification/types/NotificationMap';


export type NotificationServiceResponse = {
    [Type in keyof NotificationMap]: [ string[], Type, NotificationMap[Type] ]
}[keyof NotificationMap];