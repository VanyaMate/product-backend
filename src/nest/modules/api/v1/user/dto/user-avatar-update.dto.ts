import { IsString } from 'class-validator';


export class UserAvatarUpdateDto {
    @IsString()
    avatar: string;
}