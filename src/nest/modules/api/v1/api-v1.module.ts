import { Module } from '@nestjs/common';
import {
    AuthorizationModule,
} from '@/nest/modules/api/v1/authorization/authorization.module';
import {
    AuthenticationModule,
} from '@/nest/modules/api/v1/authentication/authentication.module';
import { UsersModule } from '@/nest/modules/api/v1/users/users.module';
import { TokenModule } from '@/nest/modules/api/v1/token/token.module';
import {
    NotificationModule,
} from '@/nest/modules/api/v1/notification/notification.module';
import { FriendModule } from '@/nest/modules/api/v1/friend/friend.module';
import { FriendsModule } from '@/nest/modules/api/v1/friends/friends.module';
import { MessageModule } from '@/nest/modules/api/v1/message/message.module';
import { SearchModule } from '@/nest/modules/api/v1/search/search.module';
import {
    PrivateDialogueModule,
} from '@/nest/modules/api/v1/private-dialogue/private-dialogue.module';
import {
    PrivateDialoguesModule,
} from '@/nest/modules/api/v1/private-dialogues/private-dialogues.module';
import {
    PrivateMessagesModule,
} from '@/nest/modules/api/v1/private-messages/private-messages.module';
import {
    PrivateMessageModule,
} from '@/nest/modules/api/v1/private-message/private-message.module';
import { PostModule } from '@/nest/modules/api/v1/post/post.module';


@Module({
    imports: [
        AuthorizationModule,
        AuthenticationModule,
        UsersModule,
        TokenModule,
        NotificationModule,
        FriendModule,
        FriendsModule,
        MessageModule,
        SearchModule,
        PrivateDialogueModule,
        PrivateDialoguesModule,
        PrivateMessageModule,
        PrivateMessagesModule,
        PostModule,
    ],
})
export class ApiV1Module {
}