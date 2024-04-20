import { Module } from '@nestjs/common';
import {
    AuthenticationModule,
} from '@/modules/api/v1/authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from '@/consts/env-names';


@Module({
    imports    : [
        ConfigModule.forRoot({
            envFilePath: `.env.${ process.env.NODE_ENV }`,
            isGlobal   : true,
        }),
        JwtModule.registerAsync({
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
})
export class AppModule {
}
