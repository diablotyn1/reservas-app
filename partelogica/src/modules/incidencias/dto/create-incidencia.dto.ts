import {
  IsInt,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrioridadEnum } from '../../../common/enums/prioridad.enum';

export class CreateIncidenciaDto {
  @ApiProperty({
    description: 'ID de la reserva asociada',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  reservaId: number;

  @ApiProperty({
    description: 'Descripción detallada de la incidencia',
    example: 'El proyector no enciende correctamente',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Prioridad de la incidencia',
    enum: PrioridadEnum,
    example: PrioridadEnum.MEDIA,
    required: false,
  })
  @IsEnum(PrioridadEnum)
  @IsOptional()
  prioridad?: PrioridadEnum;

  @ApiProperty({
    description: 'ID del usuario que reporta',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  reportadoPor: number;
}