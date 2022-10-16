import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetAuth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const company = request.params.companyAlias;
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    return { user, company };
  },
);
