import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserRelationsService } from './user-relations.service';
import { UserRelation } from './entities/user-relation.entity';
import { CreateUserRelationInput } from './dto/create-user-relation.input';
import { UpdateUserRelationInput } from './dto/update-user-relation.input';

@Resolver(() => UserRelation)
export class UserRelationsResolver {
  constructor(private readonly userRelationsService: UserRelationsService) {}

  @Mutation(() => UserRelation)
  createUserRelation(@Args('createUserRelationInput') createUserRelationInput: CreateUserRelationInput) {
    return this.userRelationsService.create(createUserRelationInput);
  }

  @Query(() => [UserRelation], { name: 'userRelations' })
  findAll() {
    return this.userRelationsService.findAll();
  }

  @Query(() => UserRelation, { name: 'userRelation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userRelationsService.findOne(id);
  }

  @Mutation(() => UserRelation)
  updateUserRelation(@Args('updateUserRelationInput') updateUserRelationInput: UpdateUserRelationInput) {
    return this.userRelationsService.update(updateUserRelationInput.id, updateUserRelationInput);
  }

  @Mutation(() => UserRelation)
  removeUserRelation(@Args('id', { type: () => Int }) id: number) {
    return this.userRelationsService.remove(id);
  }
}
