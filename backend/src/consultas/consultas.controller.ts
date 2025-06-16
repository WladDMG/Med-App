import { Controller, Get, Post, Body, Put, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CriarConsultaDto } from './dto/criar-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('consultas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async minhasConsultas(@Request() req) {
    const pacienteId = req.user._id;
    return this.consultasService.findByPacienteId(pacienteId);
  }

  @Post()
  @Roles('paciente')
  async criar(@Body() body: CriarConsultaDto, @Request() req) {
    return this.consultasService.criarConsulta({
      ...body,
      pacienteId: req.user._id,
    });
  }

  @Get()
  async listar() {
    return this.consultasService.listarConsultas();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    return this.consultasService.buscarPorId(id);
  }

  @Put(':id')
  @Roles('admin', 'medico')
  async atualizar(@Param('id') id: string, @Body() body: UpdateConsultaDto) {
    return this.consultasService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin', 'medico')
  async remover(@Param('id') id: string) {
    return this.consultasService.remove(id);
  }
}
