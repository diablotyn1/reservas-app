import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHorarioDto {
  @ApiProperty({
    description: 'Hora de inicio (formato HH:MM)',
    example: '08:00',
    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'horaInicio debe estar en formato HH:MM (ej: 08:00)',
  })
  horaInicio: string;

  @ApiProperty({
    description: 'Hora de fin (formato HH:MM)',
    example: '10:00',
    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'horaFin debe estar en formato HH:MM (ej: 10:00)',
  })
  horaFin: string;

  @ApiProperty({
    description: 'Descripción del horario',
    example: 'Bloque matutino 1',
    maxLength: 100,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  descripcion?: string;

  @ApiProperty({
    description: 'Estado activo del horario',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}