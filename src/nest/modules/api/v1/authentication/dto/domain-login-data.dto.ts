import { IsBoolean, IsString } from 'class-validator';
import { DomainLoginData } from 'product-types/dist/authorization/DomainLoginData';


export class DomainLoginDataDto implements DomainLoginData {
    @IsString()
    public login: string;

    @IsString()
    public password: string;

    @IsBoolean()
    public remember: boolean = false;
}