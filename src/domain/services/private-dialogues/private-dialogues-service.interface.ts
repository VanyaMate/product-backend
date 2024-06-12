import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';


export interface IPrivateDialoguesService {
    getList (userId: string, searchOptions: DomainSearchItemOptions): Promise<Array<DomainPrivateDialogueFull>>;

    getOne (userId: string, privateDialogueId: string): Promise<DomainPrivateDialogueFull>;
}