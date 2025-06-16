import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsOptional()
  @IsEnum(['paciente', 'medico', 'admin'])
  tipo?: string;

  @IsOptional()
  @IsEnum(['cardiologia', 'pediatria', 'ortopedia'])
  especialidade?: string;
}
