import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';


export interface IFilesUploadService {
    save<T> (userId: string, file: T): Promise<NotificationServiceResponse[]>;

    remove (userId: string, fileId: string): Promise<NotificationServiceResponse[]>;

    update (userId: string, fileId: string, fileName: string): Promise<NotificationServiceResponse[]>;
}