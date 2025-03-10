import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [AuthModule, MessagesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
