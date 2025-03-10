import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsIn,
} from 'class-validator';

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
  @IsIn(['pre-pago', 'pos-pago'])
  plan: 'pre-pago' | 'pos-pago';

  @IsOptional()
  @IsNumber()
  @Min(0)
  credits?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amountToPay?: number;
}

export class SignInDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}