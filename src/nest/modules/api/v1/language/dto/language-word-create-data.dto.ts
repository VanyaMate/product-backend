import {
    DomainLanguageWordCreateData,
} from 'product-types/dist/language/DomainLanguageWordCreateData';
import { IsArray, IsString } from 'class-validator';


export class LanguageWordCreateDataDto implements DomainLanguageWordCreateData {
    @IsString()
    original: string;

    @IsString({ each: true })
    translations: string[];

    @IsString()
    notice: string;
}