import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ConsultaDocument = Consulta & Document;

@Schema()
export class Consulta {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  medicoId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  pacienteId: Types.ObjectId;

  @Prop({ required: true })
  dataHora: Date;

  @Prop({ required: true, enum: ['cardiologia', 'pediatria', 'ortopedia'], lowercase: true })
  especialidade: string;

  @Prop()
  descricao: string;
}

export const ConsultaSchema = SchemaFactory.createForClass(Consulta);
