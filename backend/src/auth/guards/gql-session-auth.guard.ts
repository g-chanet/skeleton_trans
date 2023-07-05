import { Injectable, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlSessionLocalAuthGuard extends AuthGuard(`local`) {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctxRequest = GqlExecutionContext.create(context).getContext().req
		console.log(`before`)
		await super.logIn(ctxRequest)
		console.log(`after`)
		return ctxRequest ? true : false
	}
}
