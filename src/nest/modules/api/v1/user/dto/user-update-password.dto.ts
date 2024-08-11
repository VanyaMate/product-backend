import { IsString } from 'class-validator';


export class UserUpdatePasswordDto {
    @IsString()
    password: string;
}