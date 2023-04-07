import { UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersService } from 'src/users/users.service'
import { AuthModule } from './auth.module'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './strategies/google.strategy'

describe(`AuthService`, () => {
  let authService: AuthService
  let usersService: UsersService;
  let strategy: GoogleStrategy;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [PrismaModule, AuthModule],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    usersService = module.get<UsersService>(UsersService)
    strategy = module.get<GoogleStrategy>(GoogleStrategy)
  })

  it(`should be defined`, () => {
    expect(authService).toBeDefined()
    expect(usersService).toBeDefined()
    expect(strategy).toBeDefined()
  })

  describe(`Basic Google Auth test`, () => {

    const google_user = {email: `test@test.com`};
    //jest.spyOn(usersService, 'findOneByEmail').mockImplementationOnce(() => Promise.resolve(user as User))
    
    describe(`user creation test`, () => {
      it(`get user from google`, async () => {
        await expect(strategy.validate());
      })
    })
  })

})