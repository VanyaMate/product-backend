import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
    transformStringToNumber,
} from '@/domain/lib/class-transform/transform/transformStringToNumber';


export class PrivateMessagesSearchCursorOptionsDto {
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