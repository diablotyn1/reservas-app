import {
  IsInt,
  IsPositive,
  IsDateString,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoReservaEnum } from '../../../common/enums/estado-reserva.enum';

export class CreateReservaDto {
  @ApiProperty({
    description: 'ID del usuario que realiza la reserva',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  usuarioId: number;

  @ApiProperty({
    description: 'ID del espacio a reservar',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  espacioId: number;

  @ApiProperty({
    description: 'ID del horario',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  horarioId: number;

  @ApiProperty({
    description: 'Fecha de la reserva (YYYY-MM-DD)',
    example: '2025-11-15',
  })
  @IsDateString()
  fecha: string;

  @ApiProperty({
    description: 'Motivo de la reserva',
    example: 'Reunión de equipo',
    required: false,
  })
  @IsString()
  @IsOptional()
  motivo?: string;

  @ApiProperty({
    description: 'Observaciones adicionales',
    example: 'Necesitamos proyector',
    required: false,
  })
  @IsString()
  @IsOptional()
  observaciones?: string;

  @ApiProperty({
    description: 'Estado de la reserva',
    enum: EstadoReservaEnum,
    example: EstadoReservaEnum.ACTIVA,
    required: false,
  })
  @IsEnum(EstadoReservaEnum)
  @IsOptional()
  estado?: EstadoReservaEnum;
}