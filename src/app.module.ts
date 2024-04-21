import { Module } from '@nestjs/common';
import {
    AuthenticationModule,
} from '@/modules/api/v1/authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from '@/consts/env-names';


@Module({
    imports    : [
        ConfigModule.forRoot({
            envFilePath: `.env.${ process.env.NODE_ENV }`,
            isGlobal   : true,
        }),
        JwtModule.registerAsync({
            global    : true,
            imports   : [ ConfigModule ],
            inject    : [ ConfigService ],
            useFactory: async (config: ConfigService) => ({
                global: true,
                secret: config.get<string>(JWT_SECRET_KEY),
            }),
        }),
        AuthenticationModule,
    ],
    controllers: [],
    providers  : [],
    exports    : [],
})
export class AppModule {
}
