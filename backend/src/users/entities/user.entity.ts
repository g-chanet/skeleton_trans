import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserPublic {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;
}

@ObjectType()
export class User extends UserPublic {
  @Field(() => Boolean)
  doubleAuth: boolean;
}
