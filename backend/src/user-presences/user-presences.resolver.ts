import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UserPresencesService } from './user-presences.service'
import { UserPresence } from './entities/user-presence.entity'
import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub()

@Resolver(() => UserPresence)
export class UserPresencesResolver {
  constructor(private readonly userPresencesService: UserPresencesService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => Boolean)
  async commentAdded(
    @Args(`newComment`, { type: () => String }) newComment: string,
  ) {
    await pubSub.publish(`postAdded`, newComment)
    return true
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
