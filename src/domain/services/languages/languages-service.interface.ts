import { DomainLanguage } from 'product-types/dist/language/DomainLanguage';
import {
    DomainLanguageWithFolders,
} from 'product-types/dist/language/DomainLanguageWithFolders';
import {
    DomainLanguageWord,
} from 'product-types/dist/language/DomainLanguageWord';


export interface ILanguagesService {
    getMyLanguagesWithFolders (userId: string): Promise<Array<DomainLanguageWithFolders>>;

    getMyLanguageFolderWords (userId: string, folderId: string): Promise<Array<DomainLanguageWord>>;

    getUserLanguages (userId: string, languagesUserId: string): Promise<Array<DomainLanguageWithFolders>>;

    getLanguageFolderWords (userId: string, folderId: string): Promise<Array<DomainLanguageWord>>;
}