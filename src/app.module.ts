import { Module } from '@nestjs/common';
import {
    AuthenticationModule,
} from '@/modules/api/v1/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports    : [
        ConfigModule.forRoot({
            envFilePath: `.env.${ process.env.NODE_ENV }`,
            isGlobal   : true,
        }),
        AuthenticationModule,
    ],
    controllers: [],
    providers  : [],
})
export class AppModule {
}
