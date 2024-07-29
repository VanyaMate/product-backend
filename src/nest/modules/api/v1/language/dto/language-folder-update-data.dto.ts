import {
    DomainLanguageFolderUpdateData,
} from 'product-types/dist/language/DomainLanguageFolderUpdateData';
import { IsString } from 'class-validator';


export class LanguageFolderUpdateDataDto implements DomainLanguageFolderUpdateData {
    @IsString()
    title: string;
}