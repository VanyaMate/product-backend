import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DomainFingerprint } from 'product-types/dist/fingerprint/DomainFingerprint';
import { getFingerprint } from '@/domain/lib/request/fingerprint/getFingerprint';


export const Fingerprint = createParamDecorator<string, ExecutionContext, DomainFingerprint>(
    (_: string, ctx: ExecutionContext) => getFingerprint(ctx),
);