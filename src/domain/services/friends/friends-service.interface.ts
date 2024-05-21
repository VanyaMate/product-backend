import { DomainUser } from 'product-types/dist/user/DomainUser';


export interface IFriendsService {
    // Получить друзей пользователя по его id
    getFriendsOfUserByUserId (userId: string): Promise<DomainUser[]>;

    // Получить отправленные заявки в друзья от пользователя
    getFriendRequestsSendByUserId (userId: string): Promise<DomainUser[]>;

    // Получить полученные заявки в друзья для пользователя
    getFriendRequestsReceivedByUserId (userId: string): Promise<DomainUser[]>;

    // Получить все заявки для пользователя
    getFriendRequestsByUserId (userId: string): Promise<[ DomainUser[], DomainUser[] ]>;
}