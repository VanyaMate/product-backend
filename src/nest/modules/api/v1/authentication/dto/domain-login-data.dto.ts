import { DomainLoginData } from 'product-types';
import { IsBoolean, IsString } from 'class-validator';


export class DomainLoginDataDto implements DomainLoginData {
    @IsString()
    public login: string;

    @IsString()
    public password: string;

    @IsBoolean()
    public remember: boolean = false;
}