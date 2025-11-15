import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IncidenciasService } from './incidencias.service';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { ResolverIncidenciaDto } from './dto/resolver-incidencia.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolEnum } from '../../common/enums/rol.enum';
import { EstadoIncidenciaEnum } from '../../common/enums/estado-incidencia.enum';
import { PrioridadEnum } from '../../common/enums/prioridad.enum';

@ApiTags('Incidencias')
@ApiBearerAuth()
@Controller('incidencias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IncidenciasController {
  constructor(private readonly incidenciasService: IncidenciasService) {}

  @Post()
  @ApiOperation({ summary: 'Reportar una nueva incidencia' })
  create(@Body() createIncidenciaDto: CreateIncidenciaDto) {
    return this.incidenciasService.create(createIncidenciaDto);
  }

  @Get()
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Obtener todas las incidencias (admin/supervisor)' })
  findAll() {
    return this.incidenciasService.findAll();
  }

  @Get('pendientes')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Obtener incidencias pendientes (admin/supervisor)' })
  findPendientes() {
    return this.incidenciasService.findPendientes();
  }

  @Get('reserva/:reservaId')
  @ApiOperation({ summary: 'Obtener incidencias de una reserva' })
  findByReserva(@Param('reservaId', ParseIntPipe) reservaId: number) {
    return this.incidenciasService.findByReserva(reservaId);
  }

  @Get('estado/:estado')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Obtener incidencias por estado (admin/supervisor)' })
  findByEstado(@Param('estado') estado: EstadoIncidenciaEnum) {
    return this.incidenciasService.findByEstado(estado);
  }

  @Get('prioridad/:prioridad')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Obtener incidencias por prioridad (admin/supervisor)' })
  findByPrioridad(@Param('prioridad') prioridad: PrioridadEnum) {
    return this.incidenciasService.findByPrioridad(prioridad);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una incidencia por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incidenciasService.findOne(id);
  }

  @Patch(':id')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Actualizar una incidencia (admin/supervisor)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIncidenciaDto: UpdateIncidenciaDto,
  ) {
    return this.incidenciasService.update(id, updateIncidenciaDto);
  }

  @Patch(':id/resolver')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Resolver una incidencia (admin/supervisor)' })
  resolver(
    @Param('id', ParseIntPipe) id: number,
    @Body() resolverDto: ResolverIncidenciaDto,
  ) {
    return this.incidenciasService.resolver(id, resolverDto);
  }

  @Patch(':id/cerrar')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Cerrar una incidencia resuelta (admin/supervisor)' })
  cerrar(@Param('id', ParseIntPipe) id: number) {
    return this.incidenciasService.cerrar(id);
  }

  @Patch(':id/estado/:estado')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Cambiar estado de incidencia (admin/supervisor)' })
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Param('estado') estado: EstadoIncidenciaEnum,
  ) {
    return this.incidenciasService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Eliminar una incidencia (solo admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.incidenciasService.remove(id);
  }
}