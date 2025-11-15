import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResolverIncidenciaDto {
  @ApiProperty({
    description: 'ID del usuario que resuelve la incidencia',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  resueltoPor: number;

  @ApiProperty({
    description: 'Notas sobre la resolución',
    example: 'Se reemplazó el proyector por uno nuevo',
  })
  @IsString()
  @IsNotEmpty()
  notasResolucion: string;
}