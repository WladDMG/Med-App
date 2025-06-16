import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtigosController } from './artigos.controller';
import { ArtigosService } from './artigos.service';
import { Artigo, ArtigoSchema } from './schemas/artigo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artigo.name, schema: ArtigoSchema }]),
  ],
  controllers: [ArtigosController],
  providers: [ArtigosService],
})
export class ArtigosModule {}
