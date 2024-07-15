import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
    transformStringToNumber,
} from '@/domain/lib/class-transform/transform/transformStringToNumber';


export class FilesSearchOptionsDto {
    @IsString()
    @IsOptional()
    query: string;

    @Transform(transformStringToNumber)
    @IsNumber()
    @IsOptional()
    limit: number;

    @Transform(transformStringToNumber)
    @IsNumber()
    @IsOptional()
    offset: number;
}