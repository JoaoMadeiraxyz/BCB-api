import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddCreditsRequestDTO,
  SendMessageDTO,
  UpdateLimitDTO,
} from 'src/messages/dtos/messages';

@Injectable()
export class MessagesService {
  constructor(private prismaService: PrismaService) {}

  async addCredits(userId: string, data: AddCreditsRequestDTO) {
    const { amount } = data;
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
    });
    return user;
  }

  async updateLimit(userId: string, data: UpdateLimitDTO) {
    const { newLimit } = data;
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { limit: newLimit },
    });
    return user;
  }

  async payBill(userId: string) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { amountToPay: 0, limit: 100 },
    });
    return user;
  }

  async sendMessage(userId: string, data: SendMessageDTO) {
    const { content, telefone, type } = data;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (user.plan === 'pre-pago') {
      if (user.credits < 0.25)
        throw new BadRequestException('Insufficient credits.');
      await this.prismaService.user.update({
        where: { id: userId },
        data: { credits: { decrement: 0.25 } },
      });
    } else if (user.plan === 'pos-pago') {
      if (user.limit < 0.25) throw new BadRequestException('Limit exceeded.');
      await this.prismaService.user.update({
        where: { id: userId },
        data: {
          limit: { decrement: 0.25 },
          amountToPay: { increment: 0.25 },
        },
      });
    }

    return this.prismaService.message.create({
      data: { content, telefone, type, userId },
    });
  }
}
