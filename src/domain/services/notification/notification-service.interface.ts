export interface INotificationService<NotificationType, Notification> {
    sendByUserId (userId: string, type: NotificationType, data: unknown): Promise<Notification>;

    sendByUserLogin (userLogin: string, type: NotificationType, data: unknown): Promise<Notification>;
}