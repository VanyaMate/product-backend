import { Module } from '@nestjs/common';
import { PostsController } from '@/nest/modules/api/v1/posts/posts.controller';
import { PostsService } from '@/nest/modules/api/v1/posts/posts.service';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';


@Module({
    controllers: [ PostsController ],
    providers  : [ PostsService ],
    imports    : [
        ServicesModule,
        TokenModule,
    ],
})
export class PostsModule {
}