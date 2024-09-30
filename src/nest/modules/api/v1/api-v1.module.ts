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
import { PostsModule } from '@/nest/modules/api/v1/posts/posts.module';
import {
    FilesUploadModule,
} from '@/nest/modules/api/v1/files-upload/files-upload.module';
import { FilesModule } from '@/nest/modules/api/v1/files/files.module';
import { LanguageModule } from '@/nest/modules/api/v1/language/language.module';
import {
    LanguagesModule,
} from '@/nest/modules/api/v1/languages/languages.module';
import { UserModule } from '@/nest/modules/api/v1/user/user.module';
import { CallModule } from '@/nest/modules/api/v1/call/call.module';
import { CallsModule } from '@/nest/modules/api/v1/calls/calls.module';
import {
    ExcelModule,
} from '@/nest/modules/api/v1/excel-split/excel.module';


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
        PostsModule,
        FilesUploadModule,
        FilesModule,
        LanguageModule,
        LanguagesModule,
        UserModule,
        CallModule,
        CallsModule,
        ExcelModule,
    ],
})
export class ApiV1Module {
}