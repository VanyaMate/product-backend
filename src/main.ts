import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as cookieParser from 'cookie-parser';
import { PORT } from '@/domain/consts/env';
import { HttpExceptionFilter } from '@/nest/filters/http-exception.filter';
import { ResponseInterceptor } from '@/nest/interceptors/response.interceptor';
import * as express from 'express';
import { json, urlencoded } from 'express';
import { unless } from '@/domain/lib/helpers/unless';
import {
    requestStartTimeMiddleware,
} from '@/nest/middleware/request-start-time.middleware';
import {
    AnalyticsResponseTimeService,
} from '@/nest/modules/services/analytics/AnalyticsResponseTime/AnalyticsResponseTime.service';
import { PrismaService } from '@/nest/modules/services/prisma/prisma.service';
import {
    ResponseTimeInterceptor,
} from '@/nest/interceptors/response-time.interceptor';
import * as _cluster from 'cluster';
import { availableParallelism } from 'node:os';


const cluster = _cluster as unknown as _cluster.Cluster;


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
    app.useGlobalInterceptors(new ResponseTimeInterceptor(new AnalyticsResponseTimeService(new PrismaService())));

    app.use(requestStartTimeMiddleware);
    app.use(`/static`, express.static('static'));
    app.use(cookieParser());
    app.use(unless('/api/v1/file', json({ limit: '10mb' })));
    app.use(unless('/api/v1/file', urlencoded({
        limit   : '10mb',
        extended: true,
    })));

    if (process.env.NODE_ENV === 'dev') {
        await app.listen(port, () => console.log(`server started on: ${ port }`));
    } else {
        await app.listen(port, () => console.log(`server started on: ${ port }`));
    }
}


bootstrap();

/*const numCPUs = availableParallelism();
 if (cluster.isPrimary) {
 console.log(`Primary (${ process.pid }) is running`);

 for (let i = 0; i < numCPUs - 1; i++) {
 const worker = cluster.fork();
 worker.on('exit', () => {
 cluster.fork();
 });
 }

 cluster.on('exit', (worker, code, signal) => {
 console.log(`Worker (${ worker.process.pid }) died with code (${ code })`);
 });
 } else {
 bootstrap().then(() => {
 console.log(`Worker (${ process.pid }) started`);
 });
 }*/
