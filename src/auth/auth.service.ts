import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(data: SignUpDTO) {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
        credits: data.plan === 'pre-pago' ? 0 : undefined,
        limit: data.plan === 'pos-pago' ? 100 : undefined,
        amountToPay: data.plan === 'pos-pago' ? 0 : undefined,
      },
    });

    return { id: user.id, name: user.name, email: user.email, plan: user.plan };
  }

  async signin(data: SignInDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      email: user.email,
      telefone: user.telefone,
      cpf: user.cpf,
      cnpj: user.cnpj,
      companyName: user.companyName,
      plan: user.plan,
    });

    return { accessToken };
  }

  async me(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        telefone: true,
        cpf: true,
        cnpj: true,
        companyName: true,
        plan: true,
        credits: true,
        limit: true,
        amountToPay: true,
        messages: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async listUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        telefone: true,
        cpf: true,
        cnpj: true,
        companyName: true,
        plan: true,
        credits: true,
        limit: true,
        amountToPay: true,
        messages: true,
      },
    });
    return users;
  }
}
