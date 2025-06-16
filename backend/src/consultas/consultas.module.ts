import { Module } from '@nestjs/common';
import { ConsultasController } from './consultas.controller';
import { ConsultasService } from './consultas.service';
import { Consulta, ConsultaSchema } from './schemas/consulta.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Consulta.name, schema: ConsultaSchema }]),
  ],
  controllers: [ConsultasController],
  providers: [ConsultasService]
})
export class ConsultasModule { }
