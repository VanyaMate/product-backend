import {
    DomainPostCreateData,
} from 'product-types/dist/post/DomainPostCreateData';
import { IsString, Length } from 'class-validator';


export class PostCreateDataDto implements DomainPostCreateData {
    @IsString()
    @Length(1)
    message: string;
}