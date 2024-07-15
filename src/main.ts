import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as cookieParser from 'cookie-parser';
import { PORT } from '@/domain/consts/env';
import { HttpExceptionFilter } from '@/nest/filters/http-exception.filter';
import { ResponseInterceptor } from '@/nest/interceptors/respose.interceptor';
import * as express from 'express';
import { json, urlencoded } from 'express';
import { unless } from '@/domain/lib/helpers/unless';


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

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());

    app.use(`/static`, express.static('static'));
    app.use(unless('/api/v1/file', cookieParser()));
    app.use(unless('/api/v1/file', json({ limit: '10mb' })));
    app.use(unless('/api/v1/file', urlencoded({
        limit   : '10mb',
        extended: true,
    })));

    await app.listen(port, () => console.log(`server started on: ${ port }`));
}

bootstrap();