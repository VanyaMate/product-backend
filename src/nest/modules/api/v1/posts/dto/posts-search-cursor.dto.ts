import { Transform } from 'class-transformer';
import {
    transformStringToNumber,
} from '@/domain/lib/class-transform/transform/transformStringToNumber';
import { IsNumber, IsOptional, IsString } from 'class-validator';


export class PostsSearchCursorDto {
    @Transform(transformStringToNumber)
    @IsNumber()
    @IsOptional()
    limit: number;

    @IsString()
    cursor: string;

    @IsString()
    @IsOptional()
    query: string;
}