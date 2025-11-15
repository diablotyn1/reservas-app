import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateReservaDto } from './create-reserva.dto';

// Omitimos usuarioId, espacioId, horarioId y fecha del update
// Solo permitimos actualizar motivo, observaciones y estado
export class UpdateReservaDto extends PartialType(
  OmitType(CreateReservaDto, ['usuarioId', 'espacioId', 'horarioId', 'fecha'] as const),
) {}