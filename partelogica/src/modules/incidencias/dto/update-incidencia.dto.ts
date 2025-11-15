import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateIncidenciaDto } from './create-incidencia.dto';

// Omitimos reservaId y reportadoPor del update
export class UpdateIncidenciaDto extends PartialType(
  OmitType(CreateIncidenciaDto, ['reservaId', 'reportadoPor'] as const),
) {}