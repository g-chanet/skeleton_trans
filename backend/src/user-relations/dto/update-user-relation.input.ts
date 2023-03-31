import { CreateUserRelationInput } from './create-user-relation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserRelationInput extends PartialType(CreateUserRelationInput) {
  @Field(() => Int)
  id: number;
}
