import {
    DomainLanguageCreateData,
} from 'product-types/dist/language/DomainLanguageCreateData';
import {
    NotificationServiceResponse,
} from '@/domain/services/notification/types/NotificationServiceResponse';
import {
    DomainLanguageUpdateData,
} from 'product-types/dist/language/DomainLanguageUpdateData';
import {
    DomainLanguageFolderCreateData,
} from 'product-types/dist/language/DomainLanguageFolderCreateData';
import {
    DomainLanguageFolderUpdateData,
} from 'product-types/dist/language/DomainLanguageFolderUpdateData';
import {
    DomainLanguageWordCreateData,
} from 'product-types/dist/language/DomainLanguageWordCreateData';
import {
    DomainLanguageWordUpdateData,
} from 'product-types/dist/language/DomainLanguageWordUpdateData';


export interface ILanguageService {
    createLanguage (userId: string, createData: DomainLanguageCreateData): Promise<Array<NotificationServiceResponse>>;

    updateLanguage (userId: string, languageId: string, updateData: DomainLanguageUpdateData): Promise<Array<NotificationServiceResponse>>;

    removeLanguage (userId: string, languageId: string): Promise<Array<NotificationServiceResponse>>;

    createFolder (userId: string, languageId: string, createData: DomainLanguageFolderCreateData): Promise<Array<NotificationServiceResponse>>;

    updateFolder (userId: string, folderId: string, updateData: DomainLanguageFolderUpdateData): Promise<Array<NotificationServiceResponse>>;

    removeFolder (userId: string, folderId: string): Promise<Array<NotificationServiceResponse>>;

    createWord (userId: string, folderId: string, createData: DomainLanguageWordCreateData): Promise<Array<NotificationServiceResponse>>;

    updateWord (userId: string, wordId: string, updateData: DomainLanguageWordUpdateData): Promise<Array<NotificationServiceResponse>>;

    removeWord (userId: string, wordId: string): Promise<Array<NotificationServiceResponse>>;
}