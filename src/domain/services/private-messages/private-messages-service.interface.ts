import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    DomainSearchCursorOptions,
} from 'product-types/dist/search/DomainSearchCursorOptions';


export interface IPrivateMessagesService {
    get (userId: string, dialogueId: string, options: DomainSearchItemOptions): Promise<DomainSearchItem>;

    getByCursor (userId: string, dialogueId: string, options: DomainSearchCursorOptions): Promise<DomainSearchItem>;
}