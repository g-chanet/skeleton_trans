import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
    }),
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
