import {
    DomainPostUpdateData,
} from 'product-types/dist/post/DomainPostUpdateData';
import { IsString, Length } from 'class-validator';


export class PostUpdateDataDto implements DomainPostUpdateData {
    @IsString()
    @Length(1)
    message: string;
}