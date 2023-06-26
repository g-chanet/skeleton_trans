import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalGuard extends AuthGuard(`local`) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(`ici`)
    const result = (await super.canActivate(context)) as boolean
    console.log(`sortie`)
    await super.logIn(context.switchToHttp().getRequest())
    return result
  }
}
