import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    DomainFriendRequest,
} from 'product-types/dist/friends/DomainFriendRequest';
import { DomainFriends } from 'product-types/dist/friends/DomainFriends';


export interface IFriendsService {
    // Получить друзей пользователя по его id
    getFriendsOfUserByUserId (userId: string): Promise<DomainUser[]>;

    // Получить отправленные заявки в друзья от пользователя
    getFriendRequestsSentByUserId (userId: string): Promise<DomainFriendRequest[]>;

    // Получить полученные заявки в друзья для пользователя
    getFriendRequestsReceivedByUserId (userId: string): Promise<DomainFriendRequest[]>;

    // Получить все заявки для пользователя
    getFriendRequestsByUserId (userId: string): Promise<[ DomainFriendRequest[], DomainFriendRequest[] ]>;

    // Получить всех друзей и заявки
    getFriendsWithRequestsByUserId (userId: string): Promise<DomainFriends>;
}