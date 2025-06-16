import { IsEmail, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsIn(['paciente', 'medico', 'admin'])
  tipo: string;

  @IsOptional()
  @IsIn(['cardiologia', 'pediatria', 'ortopedia'])
  especialidade?: string;
}
