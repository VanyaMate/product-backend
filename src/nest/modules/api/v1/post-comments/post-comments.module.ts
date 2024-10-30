import { Module } from '@nestjs/common';
import {
    PostCommentsController
} from '@/nest/modules/api/v1/post-comments/post-comments.controller';
import {
    PostCommentsService
} from '@/nest/modules/api/v1/post-comments/post-comments.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';


@Module({
    controllers: [PostCommentsController],
    providers: [PostCommentsService],
    imports: [
        ServicesModule,
        TokenModule,
    ]
})
export class PostCommentsModule {
}