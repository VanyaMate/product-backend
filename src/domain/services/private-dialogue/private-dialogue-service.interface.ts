import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';


export interface IPrivateDialogueService {
    create (userInId: string, userOutId: string): Promise<Array<NotificationServiceResponse>>;

    archive (userId: string, privateDialogueId: string): Promise<Array<NotificationServiceResponse>>;

    unArchive (userId: string, privateDialogueId: string): Promise<Array<NotificationServiceResponse>>;

    remove (userId: string, privateDialogueId: string): Promise<Array<NotificationServiceResponse>>;

    updateTitle (userId: string, privateDialogueId: string, title: string): Promise<Array<NotificationServiceResponse>>;

    updateAvatar (userId: string, privateDialogueId: string, avatar: string): Promise<Array<NotificationServiceResponse>>;
}