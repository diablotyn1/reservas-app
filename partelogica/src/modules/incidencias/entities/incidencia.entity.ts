import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { EstadoIncidenciaEnum } from '../../../common/enums/estado-incidencia.enum';
import { PrioridadEnum } from '../../../common/enums/prioridad.enum';

@Entity('incidencias')
export class Incidencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'reserva_id' })
  reservaId: number;

  @ManyToOne(() => Reserva, (reserva) => reserva.incidencias, { eager: true })
  @JoinColumn({ name: 'reserva_id' })
  reserva: Reserva;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: EstadoIncidenciaEnum.REPORTADA,
  })
  estado: EstadoIncidenciaEnum;

  @Column({
    type: 'varchar',
    length: 20,
    default: PrioridadEnum.MEDIA,
  })
  prioridad: PrioridadEnum;

  @Column({ name: 'reportado_por' })
  reportadoPor: number;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'reportado_por' })
  usuarioReporta: Usuario;

  @Column({ name: 'resuelto_por', nullable: true })
  resueltoPor: number;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'resuelto_por' })
  usuarioResuelve: Usuario;

  @CreateDateColumn({ name: 'fecha_reporte' })
  fechaReporte: Date;

  @Column({ type: 'timestamp', name: 'fecha_resolucion', nullable: true })
  fechaResolucion: Date;

  @Column({ type: 'text', name: 'notas_resolucion', nullable: true })
  notasResolucion: string;
}