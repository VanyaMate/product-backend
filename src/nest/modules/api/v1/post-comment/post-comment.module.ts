import { Module } from '@nestjs/common';
import {
    PostCommentService,
} from '@/nest/modules/api/v1/post-comment/post-comment.service';
import {
    PostCommentController,
} from '@/nest/modules/api/v1/post-comment/post-comment.controller';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';


@Module({
    providers  : [ PostCommentService ],
    controllers: [ PostCommentController ],
    imports    : [ ServicesModule, TokenModule ],
})
export class PostCommentModule {
}
