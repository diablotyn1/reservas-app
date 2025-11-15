import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { Reserva } from './entities/reserva.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { EspaciosModule } from '../espacios/espacios.module';
import { HorariosModule } from '../horarios/horarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva]),
    UsuariosModule,
    EspaciosModule,
    HorariosModule,
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService],
})
export class ReservasModule {}