import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { EUserRelationType } from '@prisma/client'
@ObjectType()
export class UserRelation {
  @Field(() => String)
  id: string

  @Field(() => String)
  userOwnerId: string

  @Field(() => String)
  userTargetId: string

  @Field(() => EUserRelationType)
  type: EUserRelationType

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}

registerEnumType(EUserRelationType, {
  name: `EUserRealtionType`,
})
