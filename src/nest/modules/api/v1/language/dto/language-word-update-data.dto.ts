import {
    DomainLanguageWordUpdateData,
} from 'product-types/dist/language/DomainLanguageWordUpdateData';
import { IsBoolean, IsOptional, IsString } from 'class-validator';


export class LanguageWordUpdateDataDto implements DomainLanguageWordUpdateData {
    @IsString()
    @IsOptional()
    original: string;

    @IsString({ each: true })
    @IsOptional()
    translations: string[];

    @IsString()
    @IsOptional()
    notice: string;

    @IsString()
    @IsOptional()
    folderId: string;

    @IsBoolean()
    @IsOptional()
    checked: boolean;
}