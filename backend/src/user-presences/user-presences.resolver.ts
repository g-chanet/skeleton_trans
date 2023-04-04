import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UserPresencesService } from './user-presences.service'
import { UserPresence } from './entities/user-presence.entity'

@Resolver(() => UserPresence)
export class UserPresencesResolver {
  constructor(private readonly userPresencesService: UserPresencesService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  //onUpdateUserPresence (UserPresence)
}
