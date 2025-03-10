import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MessagesService } from './messages.service';
import {
  AddCreditsRequestDTO,
  SendMessageDTO,
  UpdateLimitDTO,
} from 'src/messages/dtos/messages';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Post('add-credits')
  async addCredits(@Request() req, @Body() body: AddCreditsRequestDTO) {
    return this.messagesService.addCredits(req.user.id, body);
  }

  @UseGuards(AuthGuard)
  @Post('update-limit')
  async updateLimit(@Request() req, @Body() body: UpdateLimitDTO) {
    return this.messagesService.updateLimit(req.user.id, body);
  }

  @UseGuards(AuthGuard)
  @Post('pay-bill')
  async payBill(@Request() req) {
    return this.messagesService.payBill(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('send-message')
  async sendMessage(
    @Request() req,
    @Body() body: SendMessageDTO,
  ) {
    return this.messagesService.sendMessage(req.user.id, body);
  }
}
