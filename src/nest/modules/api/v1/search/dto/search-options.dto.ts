import { IsString } from 'class-validator';


export class SearchOptionsDto {
    @IsString()
    query: string;

    @IsString()
    searchIn: string;
}