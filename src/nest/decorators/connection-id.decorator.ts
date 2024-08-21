import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_ID_HEADER } from '@/domain/consts/request-response';


export const ConnectionId = createParamDecorator<string, ExecutionContext, string>(
    (_: string, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().header(REQUEST_ID_HEADER),
);