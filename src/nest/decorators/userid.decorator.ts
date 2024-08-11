import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_ID } from '@/domain/consts/request-response';


export const UserId = createParamDecorator<string, ExecutionContext, string>(
    (_: string, ctx: ExecutionContext) => ctx.switchToHttp().getRequest()[REQUEST_USER_ID],
);