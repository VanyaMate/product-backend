import { DomainFile } from 'product-types/dist/file/DomainFile';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchCursorOptions,
} from 'product-types/dist/search/DomainSearchCursorOptions';


export interface IFilesService {
    getFileById (userId: string, fileId: string): Promise<DomainFile>;

    getFilesByIds (userId: string, filesIds: string[]): Promise<DomainFile[]>;

    getFilesByUserId (userId: string, searchOptions: DomainSearchItemOptions): Promise<DomainSearchItem>;

    getFilesByUserIdWithCursor (userId: string, cursorOptions: DomainSearchCursorOptions): Promise<DomainSearchItem>;
}