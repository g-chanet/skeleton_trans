import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionService } from './session.service';

@Module({
  providers: [SessionService],
  exports: [SessionService],
  imports: [PrismaModule],
})
export class SessionModule {}
