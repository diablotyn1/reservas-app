import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidenciasService } from './incidencias.service';
import { IncidenciasController } from './incidencias.controller';
import { Incidencia } from './entities/incidencia.entity';
import { ReservasModule } from '../reservas/reservas.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidencia]),
    ReservasModule,
    UsuariosModule,
  ],
  controllers: [IncidenciasController],
  providers: [IncidenciasService],
  exports: [IncidenciasService],
})
export class IncidenciasModule {}