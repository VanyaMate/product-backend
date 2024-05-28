import {
    DomainSearchOptions,
} from 'product-types/dist/search/DomainSearchOptions';
import { DomainSearch } from 'product-types/dist/search/DomainSearch';
import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';


export interface ISearchService {
    searchAll (options: DomainSearchOptions): Promise<DomainSearch>;

    searchProfiles (options: DomainSearchItemOptions): Promise<DomainSearchItem>;
}