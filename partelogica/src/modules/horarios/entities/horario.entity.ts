import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('horarios')
export class Horario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time', name: 'hora_inicio' })
  horaInicio: string;

  @Column({ type: 'time', name: 'hora_fin' })
  horaFin: string;

  @Column({ length: 100, nullable: true })
  descripcion: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}