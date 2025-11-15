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
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolEnum } from '../../common/enums/rol.enum';

@ApiTags('Horarios')
@ApiBearerAuth()
@Controller('horarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @Post()
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Crear un nuevo horario (solo admin)' })
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.create(createHorarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los horarios' })
  findAll() {
    return this.horariosService.findAll();
  }

  @Get('activos')
  @ApiOperation({ summary: 'Obtener horarios activos' })
  findActivos() {
    return this.horariosService.findActivos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un horario por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.horariosService.findOne(id);
  }

  @Patch(':id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Actualizar un horario (solo admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHorarioDto: UpdateHorarioDto,
  ) {
    return this.horariosService.update(id, updateHorarioDto);
  }

  @Patch(':id/toggle-activo')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Activar/Desactivar horario (solo admin)' })
  toggleActivo(@Param('id', ParseIntPipe) id: number) {
    return this.horariosService.toggleActivo(id);
  }

  @Delete(':id')
  @Roles(RolEnum.ADMIN)
  @ApiOperation({ summary: 'Eliminar un horario (solo admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.horariosService.remove(id);
  }
}