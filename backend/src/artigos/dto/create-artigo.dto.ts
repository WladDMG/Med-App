import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtigoDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  imagem?: string;
}
