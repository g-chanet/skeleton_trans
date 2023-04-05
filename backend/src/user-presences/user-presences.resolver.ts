import { Args, Mutation, Resolver } from '@nestjs/graphql'
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

  @Mutation(() => Boolean)
  async commentAdded(
    @Args(`newComment`, { type: () => String }) newComment: string,
  ) {
    await this.pubSub.publish(`postAdded`, newComment)
    return true
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
