import {
    DomainLanguageFolderCreateData,
} from 'product-types/dist/language/DomainLanguageFolderCreateData';
import { IsString } from 'class-validator';


export class LanguageFolderCreateDataDto implements DomainLanguageFolderCreateData {
    @IsString()
    title: string;
}