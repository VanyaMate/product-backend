import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
    REQUEST_REFRESH_TOKEN_HEADER,
} from '@/domain/consts/request-response';


export const RefreshToken = createParamDecorator<string, ExecutionContext, string>(
    (_: string, ctx: ExecutionContext) => ctx.switchToHttp().getRequest()[REQUEST_REFRESH_TOKEN_HEADER],
);