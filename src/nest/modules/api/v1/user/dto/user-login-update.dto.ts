import { IsString } from 'class-validator';


export class UserLoginUpdateDto {
    @IsString()
    login: string;
}