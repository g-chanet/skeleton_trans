import { EUserRelationType } from '@prisma/client'
// import { UsersModule } from 'src/users/users.module'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserRelationsService } from './user-relations.service'
import { UsersService } from 'src/users/users.service'
import { UsersModule } from 'src/users/users.module'
import { User } from 'src/users/entities/user.entity'

describe(`UserRelationsService`, () => {
  let userRelationsService: UserRelationsService
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRelationsService],
      imports: [PrismaModule, UsersModule],
    }).compile()

    userRelationsService =
      module.get<UserRelationsService>(UserRelationsService)
    usersService = module.get<UsersService>(UsersService)
  })

  it(`should be defined`, () => {
    expect(userRelationsService).toBeDefined()
    expect(usersService).toBeDefined()
  })

  describe(`Init user`, () => {
    let userA: User
    let userB: User

    beforeAll(async () => {
      userA = await usersService.create({
        email: `userA@test.app`,
        username: `userA`,
      })
      console.log(`userA`, userA)
      userB = await usersService.create({
        email: `userB@test.app`,
        username: `userB`,
      })
    })

    describe(`UserA demande UserB`, () => {
      it(`UserA demande UserB en ami`, async () => {
        await userRelationsService.createRequestFriend(userA.id, userB.id)
      })
      it(`La relation UserA vers UserB est bien de type PendingAccept`, async () => {
        const relationA = await userRelationsService.findOne(userA.id, userB.id)
        expect(relationA.type).toBe(EUserRelationType.PendingAccept)
      })
      it(`La relation UserB vers UserA est bien de type WaitingAccept`, async () => {
        const relationB = await userRelationsService.findOne(userB.id, userA.id)
        expect(relationB.type).toBe(EUserRelationType.WaitingAccept)
      })
    })

    afterAll(async () => {
      await usersService.delete(userA.id)
      await usersService.delete(userB.id)
    })
  })
})
