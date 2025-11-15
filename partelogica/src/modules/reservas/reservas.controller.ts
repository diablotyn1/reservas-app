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
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolEnum } from '../../common/enums/rol.enum';
import { EstadoReservaEnum } from '../../common/enums/estado-reserva.enum';

@ApiTags('Reservas')
@ApiBearerAuth()
@Controller('reservas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reserva' })
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservasService.create(createReservaDto);
  }

  @Get()
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Obtener todas las reservas (admin/supervisor)' })
  findAll() {
    return this.reservasService.findAll();
  }

  @Get('verificar-disponibilidad')
  @ApiOperation({ summary: 'Verificar disponibilidad de espacio' })
  @ApiQuery({ name: 'espacioId', type: Number })
  @ApiQuery({ name: 'horarioId', type: Number })
  @ApiQuery({ name: 'fecha', type: String, description: 'Formato: YYYY-MM-DD' })
  async verificarDisponibilidad(
    @Query('espacioId', ParseIntPipe) espacioId: number,
    @Query('horarioId', ParseIntPipe) horarioId: number,
    @Query('fecha') fecha: string,
  ) {
    const disponible = await this.reservasService.verificarDisponibilidad(
      espacioId,
      horarioId,
      fecha,
    );
    return { disponible };
  }

  @Get('usuario/:usuarioId')
  @ApiOperation({ summary: 'Obtener reservas de un usuario' })
  findByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.reservasService.findByUsuario(usuarioId);
  }

  @Get('espacio/:espacioId')
  @ApiOperation({ summary: 'Obtener reservas de un espacio' })
  findByEspacio(@Param('espacioId', ParseIntPipe) espacioId: number) {
    return this.reservasService.findByEspacio(espacioId);
  }

  @Get('estado/:estado')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Obtener reservas por estado (admin/supervisor)' })
  findByEstado(@Param('estado') estado: EstadoReservaEnum) {
    return this.reservasService.findByEstado(estado);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reserva por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reserva' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservaDto: UpdateReservaDto,
  ) {
    return this.reservasService.update(id, updateReservaDto);
  }

  @Patch(':id/cancelar')
  @ApiOperation({ summary: 'Cancelar una reserva' })
  cancelar(@Param('id', ParseIntPipe) id: number) {
    return this.reservasService.cancelar(id);
  }

  @Patch(':id/completar')
  @Roles(RolEnum.ADMIN, RolEnum.SUPERVISOR)
  @ApiOperation({ summary: 'Marcar reserva como completada (admin/supervisor)' })
  completar(@Param('id', ParseIntPipe) id: number) {
    return this.reservasService.completar(id);
  }

  @Delete(':id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Eliminar una reserva (solo admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservasService.remove(id);
  }
}