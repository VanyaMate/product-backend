import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';


export interface IFilesUploadService {
    save (
        userId: string,
        fileName: string,
        fileMimetype: string,
        fileSize: number,
        fileBuffer: Buffer,
    ): Promise<NotificationServiceResponse[]>;

    remove (userId: string, fileId: string): Promise<NotificationServiceResponse[]>;

    update (userId: string, fileId: string, fileName: string): Promise<NotificationServiceResponse[]>;
}