import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consulta, ConsultaDocument } from './schemas/consulta.schema';

@Injectable()
export class ConsultasService {
  constructor(@InjectModel(Consulta.name) private consultaModel: Model<ConsultaDocument>) {}

  async findByPacienteId(pacienteId: string): Promise<Consulta[]> {
    return this.consultaModel
      .find({ pacienteId })
      .populate('medicoId', 'nome') // popula o nome do médico
      .exec();
  }

  async criarConsulta(data: any): Promise<Consulta> {
    return this.consultaModel.create(data);
  }

  async listarConsultas(): Promise<Consulta[]> {
    return this.consultaModel.find().populate('medicoId', 'nome').exec();
  }

  async buscarPorId(id: string): Promise<Consulta> {
    const consulta = await this.consultaModel.findById(id).populate('medicoId', 'nome').exec();
    if (!consulta) {
      throw new NotFoundException('Consulta não encontrada');
    }
    return consulta;
  }

  async update(id: string, data: any) {
    return this.consultaModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string) {
    return this.consultaModel.findByIdAndDelete(id);
  }
}
