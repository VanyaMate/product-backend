import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';


export interface IPrivateMessagesService {
    get (userId: string, dialogueId: string, options: DomainSearchItemOptions): Promise<DomainSearchItem>;
}