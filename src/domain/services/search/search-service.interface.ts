import {
    DomainSearchOptions,
} from 'product-types/dist/search/DomainSearchOptions';
import { DomainSearch } from 'product-types/dist/search/DomainSearch';


export interface ISearchService {
    searchAll (options: DomainSearchOptions): Promise<DomainSearch>;
}