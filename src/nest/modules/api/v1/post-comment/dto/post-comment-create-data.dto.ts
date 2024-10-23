import {
    DomainPostCreateData,
} from 'product-types/dist/post/DomainPostCreateData';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';
import { IsString } from 'class-validator';


export class PostCommentCreateDataDto implements DomainCommentCreateData {
    @IsString()
    comment: string;
}