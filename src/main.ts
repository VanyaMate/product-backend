import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as cookieParser from 'cookie-parser';
import { PORT } from '@/domain/consts/env';
import { HttpExceptionFilter } from '@/nest/filters/http-exception.filter';
import {
    DomainHttpExceptionFilter,
} from '@/nest/filters/domain-http-exception.filter';
import { ResponseInterceptor } from '@/nest/interceptors/respose.interceptor';


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
    app.useGlobalFilters(new DomainHttpExceptionFilter());

    app.use(cookieParser());
    await app.listen(port, () => console.log(`server started on: ${ port }`));
}

bootstrap();