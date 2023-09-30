import { Injectable, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { UserPresencesService } from 'src/user-presences/user-presences.service'

@Injectable()
export class GqlAuthGuard extends AuthGuard(`local`) {
  constructor(private readonly userPresencesService: UserPresencesService) {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    //console.log(`classic guard : `, ctx.getContext().req.body)
    return ctx.getContext().req
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const usr = ctx.getContext().req.user
    //console.log(`classic: `, ctx.getContext().req)
    if (usr) {
      await this.userPresencesService.updateOrCreateUserPresence(usr.id)
    }
    return ctx.getContext().req.isAuthenticated()
  }
}
