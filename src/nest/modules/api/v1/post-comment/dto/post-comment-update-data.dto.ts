import { IsString } from 'class-validator';
import {
    DomainCommentUpdateData,
} from 'product-types/dist/comment/DomainCommentUpdateData';


export class PostCommentUpdateDataDto implements DomainCommentUpdateData {
    @IsString()
    comment: string;
}