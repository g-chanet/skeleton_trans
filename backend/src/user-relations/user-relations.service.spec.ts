import { EUserRelationType, UserRelation, User } from '@prisma/client'
// import { UsersModule } from 'src/users/users.module'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserRelationsService } from './user-relations.service'
import { UsersService } from 'src/users/users.service'
import { UsersModule } from 'src/users/users.module'

describe(`UserRelationsService`, () => {
  let userRelationsService: UserRelationsService
  let usersService: UsersService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRelationsService],
      imports: [PrismaModule, UsersModule],
    }).compile()

    userRelationsService =
      module.get<UserRelationsService>(UserRelationsService)
    usersService = module.get<UsersService>(UsersService)
  })

  it(`Services should be defined`, () => {
    expect(userRelationsService).toBeDefined()
    expect(usersService).toBeDefined()
  })

  describe(`Friendship tests`, () => {
    let userA: User
    let userB: User
    let relationA: UserRelation
    let relationB: UserRelation
    const userAMail = `userA@test.app`
    const userBMail = `userB@test.app`

    it(`DataBase cleared verification`, async () => {
      expect(await usersService.findOneByEmail(userAMail)).toBeNull()
      expect(await usersService.findOneByEmail(userBMail)).toBeNull()
    })
    describe(`Request friend tests`, () => {
      describe(`No relations case`, () => {
        it(`Create 2 new users`, async () => {
          userA = await usersService.create({
            email: userAMail,
            username: `userA`,
          })
          userB = await usersService.create({
            email: userBMail,
            username: `userB`,
          })
        })
        it(`A->B Friend request`, async () => {
          await userRelationsService.createRequestFriend(userA.id, userB.id)
        })
        it(`A->B Relation exists`, async () => {
          relationA = await userRelationsService.findOne(userA.id, userB.id)
          expect(relationA).toBeDefined()
        })
        it(`A->B Relation type is PendingAccept`, () => {
          expect(relationA.type).toBe(EUserRelationType.PendingAccept)
        })
        it(`B->A Relation exists`, async () => {
          relationB = await userRelationsService.findOne(userB.id, userA.id)
          expect(relationB).toBeDefined()
        })
        it(`B->A Relation type is WaitingAccept`, () => {
          expect(relationB.type).toBe(EUserRelationType.WaitingAccept)
        })
        it(`[Error] A->B Friend request resent`, async () => {
          await expect(
            userRelationsService.createRequestFriend(userA.id, userB.id),
          ).rejects.toThrow()
        })
        it(`B->A Friend request`, async () => {
          await userRelationsService.createRequestFriend(userB.id, userA.id)
        })
        it(`A->B Relation type is Friend`, async () => {
          relationA = await userRelationsService.findOne(userA.id, userB.id)
          expect(relationA.type).toBe(EUserRelationType.Friend)
        })
        it(`B->A Relation type is Friend`, async () => {
          relationB = await userRelationsService.findOne(userB.id, userA.id)
          expect(relationB.type).toBe(EUserRelationType.Friend)
        })
        it(`[Error] A->B Friend request resent`, async () => {
          await expect(
            userRelationsService.createRequestFriend(userA.id, userB.id),
          ).rejects.toThrow()
        })
        it(`[Error] B->A Friend request resent`, async () => {
          await expect(
            userRelationsService.createRequestFriend(userB.id, userA.id),
          ).rejects.toThrow()
        })
        it(`Clear DataBase`, async () => {
          await usersService.delete(userA.id)
          await usersService.delete(userB.id)
        })
        it(`A and B deleted`, async () => {
          expect(await usersService.findOne(userA.id)).toBeNull()
          expect(await usersService.findOne(userB.id)).toBeNull()
        })
      })
      describe(`Already friend case`, () => {
        it(`Create 2 new users`, async () => {
          userA = await usersService.create({
            email: userAMail,
            username: `userA`,
          })
          userB = await usersService.create({
            email: userBMail,
            username: `userB`,
          })
        })
        it(`User A and B defined`, async () => {
          expect(await usersService.findOne(userA.id)).toBeDefined()
          expect(await usersService.findOne(userB.id)).toBeDefined()
        })
        it(`A->B Friend request`, async () => {
          await userRelationsService.createRequestFriend(userA.id, userB.id)
        })
        // describe(`Blocked friend case`, () => {})
      })
    })

    // describe(`Test du refus d'amitié`, () => {
    //   beforeAll(async () => {
    //     userA = await usersService.create({
    //       email: `userA@test.app`,
    //       username: `userA`,
    //     })
    //     userB = await usersService.create({
    //       email: `userB@test.app`,
    //       username: `userB`,
    //     })
    //   })
    // })
    // describe(`Test du bloquage de relation`, () => {
    //   beforeAll(async () => {
    //     userA = await usersService.create({
    //       email: `userA@test.app`,
    //       username: `userA`,
    //     })
    //     userB = await usersService.create({
    //       email: `userB@test.app`,
    //       username: `userB`,
    //     })
    //   })
    // })
    // describe(`Test du déblocage de relation`, () => {
    //   beforeAll(async () => {
    //     userA = await usersService.create({
    //       email: `userA@test.app`,
    //       username: `userA`,
    //     })
    //     userB = await usersService.create({
    //       email: `userB@test.app`,
    //       username: `userB`,
    //     })
    //   })
    // })
    // describe(`Test de la suppression d'amitié `, () => {
    //   beforeAll(async () => {
    //     userA = await usersService.create({
    //       email: `userA@test.app`,
    //       username: `userA`,
    //     })
    //     userB = await usersService.create({
    //       email: `userB@test.app`,
    //       username: `userB`,
    //     })
    //   })
    // })

    afterAll(async () => {
      await usersService.delete(userA.id)
      await usersService.delete(userB.id)
    })
  })
})
