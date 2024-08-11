import {
    DomainUserContactsInfo,
} from 'product-types/dist/user/DomainUserContactsInfo';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';


export class UserContactInfoUpdateDto implements DomainUserContactsInfo {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsPhoneNumber()
    phoneNumber: string;
}