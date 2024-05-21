export interface IFriendService {
    // Создает заявку (friend request)
    add (fromUserId: string, toUserId: string): Promise<boolean>;

    // Создает связь (friend)
    accept (fromUserId: string, toUserId: string): Promise<boolean>;

    // Удаляет связь (friend)
    remove (fromUserId: string, toUserId: string): Promise<boolean>;

    // Отменяет заявку (friend request)
    cancel (fromUserId: string, toUserId: string): Promise<boolean>;
}