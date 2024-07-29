import {
    DomainLanguageCreateData,
} from 'product-types/dist/language/DomainLanguageCreateData';
import { IsString } from 'class-validator';


export class LanguageCreateDataDto implements DomainLanguageCreateData {
    @IsString()
    title: string;
}