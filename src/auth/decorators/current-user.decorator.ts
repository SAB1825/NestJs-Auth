import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "../types/jwt-payload.type";
import { AuthenticatedRequest } from "../types/authenticated-request.type";


export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  }
)
