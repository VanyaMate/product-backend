import { Module } from '@nestjs/common';
import { PostService } from '@/nest/modules/api/v1/post/post.service';
import { PostController } from '@/nest/modules/api/v1/post/post.controller';
import { ServicesModule } from '@/nest/modules/services/services.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';


@Module({
    providers  : [ PostService ],
    controllers: [ PostController ],
    imports    : [
        ServicesModule,
        TokenModule,
        NotificationModule,
    ],
})
export class PostModule {
}