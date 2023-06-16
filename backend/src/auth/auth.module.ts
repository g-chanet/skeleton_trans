import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'
import { GoogleStrategy } from './strategies/google.strategy'
import { SessionSerializer } from './utils/Serializer'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: `AUTH_SERVICE`,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
