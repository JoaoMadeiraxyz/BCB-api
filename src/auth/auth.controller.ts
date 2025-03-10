import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDTO, SignUpDTO } from './dtos/auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: SignUpDTO) {
    return this.authService.signup(data);
  }

  @Post('signin')
  async signin(@Body() data: SignInDTO) {
    return this.authService.signin(data);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() req) {
    const userId = req.user.id;
    return this.authService.me(userId);
  }

  @UseGuards(AuthGuard)
  @Get('list-users')
  async listUsers() {
    return this.authService.listUsers();
  }
}
