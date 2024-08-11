import { IsString } from 'class-validator';


export class UserUpdateBackgroundDto {
    @IsString()
    background: string;
}