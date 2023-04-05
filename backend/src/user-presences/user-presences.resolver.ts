import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { UserPresencesService } from './user-presences.service'
import { UserPresence } from './entities/user-presence.entity'
import { PubSub } from 'graphql-subscriptions'

@Resolver(() => UserPresence)
export class UserPresencesResolver {
  constructor(
    private readonly userPresencesService: UserPresencesService,
    private readonly pubSub: PubSub,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Mutation(() => Boolean)
  async commentAdded(
    @Args(`newComment`, { type: () => String }) newComment: string,
  ) {
    const pr = new UserPresence()
    pr.id = `42`
    pr.connectedAt = new Date()
    pr.userId = `48`
    await this.pubSub.publish(`postAdded`, { sss: `Ho` })
    return true
  }

  @Subscription(() => String)
  sss() {
    return this.pubSub.asyncIterator(`postAdded`)
  }
}
