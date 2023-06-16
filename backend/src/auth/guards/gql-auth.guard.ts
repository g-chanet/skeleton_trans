import { Injectable, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard(`jwt`) {
  constructor() {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    console.log(ctx.getContext().req)
    return ctx.getContext().req
  }

  canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    console.log(`ctx.getContext().req`, ctx.getContext().req)
    return ctx.getContext().req.isAuthenticated()
  }
}
