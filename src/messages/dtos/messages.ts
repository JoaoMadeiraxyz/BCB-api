import { IsIn, IsNotEmpty, IsNumber, Min, IsString } from 'class-validator';

export class AddCreditsRequestDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}

export class UpdateLimitDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  newLimit: number;
}

export class SendMessageDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsIn(['whatsapp', 'sms'])
  type: 'whatsapp' | 'sms';
}
