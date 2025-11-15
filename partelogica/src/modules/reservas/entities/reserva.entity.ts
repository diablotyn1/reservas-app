import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Espacio } from '../../espacios/entities/espacio.entity';
import { Horario } from '../../horarios/entities/horario.entity';
import { Incidencia } from '../../incidencias/entities/incidencia.entity';
import { EstadoReservaEnum } from '../../../common/enums/estado-reserva.enum';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'espacio_id' })
  espacioId: number;

  @ManyToOne(() => Espacio, { eager: true })
  @JoinColumn({ name: 'espacio_id' })
  espacio: Espacio;

  @Column({ name: 'horario_id' })
  horarioId: number;

  @ManyToOne(() => Horario, { eager: true })
  @JoinColumn({ name: 'horario_id' })
  horario: Horario;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({
    type: 'varchar',
    length: 20,
    default: EstadoReservaEnum.ACTIVA,
  })
  estado: EstadoReservaEnum;

  @Column({ type: 'text', nullable: true })
  motivo: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Incidencia, (incidencia) => incidencia.reserva)
  incidencias: Incidencia[];
}