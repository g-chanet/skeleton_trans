import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserRelationsService } from './user-relations.service';
import { UserRelation } from './entities/user-relation.entity';

@Resolver(() => UserRelation)
export class UserRelationsResolver {
  constructor(private readonly userRelationsService: UserRelationsService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
