import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtigoDocument = Artigo & Document;

@Schema()
export class Artigo {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  descricao: string;

  @Prop()
  imagem: string;
}

export const ArtigoSchema = SchemaFactory.createForClass(Artigo);
