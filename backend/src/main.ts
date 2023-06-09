import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.enableCors({
    origin: `*`,
    credentials: true,
  })
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())
  const prismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)
  await app.listen(3000)
}
bootstrap()
