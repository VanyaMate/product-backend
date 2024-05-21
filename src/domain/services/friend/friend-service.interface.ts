export interface IFriendService {
    // Создает заявку или создает связь с удалением заявки
    add (fromUserId: string, toUserId: string): Promise<boolean>;

    // Удаляет связь (friend)
    remove (fromUserId: string, toUserId: string): Promise<boolean>;

    // Отменяет заявку (удаляет request)
    cancel (fromUserId: string, toUserId: string): Promise<boolean>;
}