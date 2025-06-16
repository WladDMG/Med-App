import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConsultasModule } from './consultas/consultas.module';
import { ArtigosModule } from './artigos/artigos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://wladstifler:eUopiHDxkw4JqGci@clustermedapp.9gwttcl.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMedApp'),
    UsersModule,
    AuthModule,
    ConsultasModule,
    ArtigosModule,
  ],
})
export class AppModule { }