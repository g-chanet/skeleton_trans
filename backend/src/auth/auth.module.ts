import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, LocalStrategy],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(
    //     expressSession({
    //       secret: 'SOME SESSION SECRET',
    //       resave: false,
    //       saveUninitialized: false,
    //     }),
    //     passport.session(),
    //   )
    //   .forRoutes('*');
  }
}
