import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as cookieParser from 'cookie-parser';
import { PORT } from '@/consts/env-names';


async function bootstrap () {
    const app: INestApplication = await NestFactory.create(
        AppModule,
        {
            cors  : {
                origin     : (origin, callback) => {
                    callback(null, origin);
                },
                credentials: true,
            },
            logger: [ 'log', 'fatal', 'error', 'warn', 'debug', 'verbose' ],
        });

    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    const port: string                 = configService.get<string>(PORT);

    app.use(cookieParser());
    await app.listen(port, () => console.log(`server started on: ${ port }`));
}

bootstrap();