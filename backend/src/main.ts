import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  const prismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)
  await app.listen(3000)
}
bootstrap()
