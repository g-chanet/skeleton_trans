import { Args, Mutation, Resolver, Subscription, Query } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { UserPresencesService } from './user-presences.service'
import { UserPresence } from './entities/user-presence.entity'
import { PubSub } from 'graphql-subscriptions'
import * as DTO from './dto/user-presence.input'

@Resolver(() => UserPresence)
export class UserPresencesResolver {
  constructor(
    private readonly userPresencesService: UserPresencesService,
    private readonly pubSub: PubSub,
  ) { }

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

  @Query(() => [UserPresence])
  @UseGuards(GqlAuthGuard)
  async findUserPresences(@Args(`args`) args: DTO.FindUserPresencesInput) {
    return await this.userPresencesService.getUserPresencesByUserIds(
      args.userIds,
    )
  }
  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => UserPresence)
  usersPresenceUpdated(@Args(`args`) args: DTO.FindUserPresencesInput) {
    console.log(`args: `, args.userIds)
    return this.pubSub.asyncIterator(
      args.userIds.map((id) => `userPresenceUpdated:${id}`),
    )
  }
}
