import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArtigosService } from './artigos.service';
import { CreateArtigoDto } from './dto/create-artigo.dto';

@Controller('artigos')
export class ArtigosController {
  constructor(private readonly artigosService: ArtigosService) {}

  @Post()
  create(@Body() dto: CreateArtigoDto) {
    return this.artigosService.create(dto);
  }

  @Get()
  findAll() {
    return this.artigosService.findAll();
  }
}
