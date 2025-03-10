import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  telefone: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  plan: 'pre-pago' | 'pos-pago';
}

export class SignInDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
