import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';


export const getFingerprint = (ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return {
        ip     : request.ip,
        device : request.header('device') ?? 'any',
        browser: request.header('browser') ?? 'any',
    };
};