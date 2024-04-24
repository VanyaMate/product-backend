import { IsBoolean, IsEmail, IsString } from 'class-validator';
import {
    DomainRegistrationData
} from 'product-types/dist/authorization/DomainRegistrationData';


export class DomainRegistrationDataDto implements DomainRegistrationData {
    @IsString()
    public login: string;

    @IsString()
    public password: string;

    @IsEmail()
    public email: string;

    @IsBoolean()
    public remember: boolean = false;
}