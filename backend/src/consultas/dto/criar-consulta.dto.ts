import { IsDateString, IsEnum, IsString } from 'class-validator';

export class CriarConsultaDto {
  @IsString()
  medicoId: string;

  @IsDateString()
  dataHora: Date;

  @IsEnum(['cardiologia', 'pediatria', 'ortopedia'])
  especialidade: string;

  @IsString()
  descricao: string;
}
