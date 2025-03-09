export interface SignUpDTO {
  name: string;
  email: string;
  password: string;
  telefone: string;
  cpf: string;
  cnpj: string;
  companyName: string;
  plan: 'pre-pago' | 'pos-pago';
}

export interface SignInDTO {
  email: string;
  password: string;
}
