import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';
import { ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

export function Auth(...roles: string[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'No autenticado' }),
    ApiForbiddenResponse({ description: 'Sin permisos suficientes' }),
  );
}