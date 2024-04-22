import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';
import { Request } from 'express';


export const Fingerprint = createParamDecorator<string, ExecutionContext, DomainFingerprint>(
    (data: string, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
        return {
            ip     : request.ip,
            device : request.header('device') ?? 'any',
            browser: request.header('browser') ?? 'any',
        };
    },
);