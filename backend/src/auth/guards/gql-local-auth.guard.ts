import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard(`local`) {
	constructor() {
		console.log(`ìciiii`)
		super()
	}

	getRequest(context: ExecutionContext) {
		console.log(`ìciiii`)
		const ctx = GqlExecutionContext.create(context)
		const gqlReq = ctx.getContext().req
		const {
			args: { email, password },
		} = ctx.getArgs()
		gqlReq.body.email = email
		gqlReq.body.password = password
		console.log(gqlReq.body)
		return gqlReq
	}
}
