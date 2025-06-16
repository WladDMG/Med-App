import { IsOptional, IsDateString, IsEnum, IsString } from 'class-validator';

export class UpdateConsultaDto {
  @IsOptional()
  @IsDateString()
  dataHora?: Date;

  @IsOptional()
  @IsEnum(['cardiologia', 'pediatria', 'ortopedia'])
  especialidade?: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
