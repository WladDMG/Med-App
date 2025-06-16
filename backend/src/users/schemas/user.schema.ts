import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true }) nome: string;
  @Prop({ required: true }) senha: string;
  @Prop({ required: true }) email: string;
  @Prop({ required: true, enum: ['paciente', 'medico', 'admin'], default: 'paciente' })
  tipo: string;
   @Prop({ required: false, enum: ['cardiologia', 'pediatria', 'ortopedia'] })
  especialidade?: string; // <-- importante estar aqui
}

export const UserSchema = SchemaFactory.createForClass(User);
