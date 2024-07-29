import {
    DomainLanguageUpdateData,
} from 'product-types/dist/language/DomainLanguageUpdateData';
import { IsString } from 'class-validator';


export class LanguageUpdateDataDto implements DomainLanguageUpdateData {
    @IsString()
    title: string;
}