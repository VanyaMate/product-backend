import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
    transformStringToNumber,
} from '@/domain/lib/class-transform/transform/transformStringToNumber';


export class PrivateMessagesSearchOptionsDto {
    @Transform(transformStringToNumber)
    @IsNumber()
    @IsOptional()
    limit: number;

    @Transform(transformStringToNumber)
    @IsNumber()
    @IsOptional()
    offset: number;

    @IsString()
    @IsOptional()
    query: string;
}