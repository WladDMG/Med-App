import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artigo, ArtigoDocument } from './schemas/artigo.schema';
import { CreateArtigoDto } from './dto/create-artigo.dto';

@Injectable()
export class ArtigosService {
  constructor(
    @InjectModel(Artigo.name) private artigoModel: Model<ArtigoDocument>,
  ) {}

  async create(dto: CreateArtigoDto): Promise<Artigo> {
    return this.artigoModel.create(dto);
  }

  async findAll(): Promise<Artigo[]> {
    return this.artigoModel.find().exec();
  }
}
