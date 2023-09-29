import { ObjectType, Field, registerEnumType, ID } from '@nestjs/graphql'
import { EUserRelationType } from '@prisma/client'
import { UserPublicGameInfos } from '../../users/entities/user.entity'

@ObjectType()
export class UserRelation {
  @Field(() => ID)
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

  @Field(() => UserPublicGameInfos)
  friendInfos: UserPublicGameInfos
}

registerEnumType(EUserRelationType, {
  name: `EUserRealtionType`,
})
