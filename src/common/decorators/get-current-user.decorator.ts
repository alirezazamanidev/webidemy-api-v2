import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadRt } from 'src/modules/auth/types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof PayloadRt | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    if (!data) return req.user;
    return req.user[data];
  },
);
