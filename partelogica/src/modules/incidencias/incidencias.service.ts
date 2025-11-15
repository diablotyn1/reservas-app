import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidencia } from './entities/incidencia.entity';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { ResolverIncidenciaDto } from './dto/resolver-incidencia.dto';
import { ReservasService } from '../reservas/reservas.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { EstadoIncidenciaEnum } from '../../common/enums/estado-incidencia.enum';
import { PrioridadEnum } from '../../common/enums/prioridad.enum';

@Injectable()
export class IncidenciasService {
  constructor(
    @InjectRepository(Incidencia)
    private readonly incidenciaRepository: Repository<Incidencia>,
    private readonly reservasService: ReservasService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createIncidenciaDto: CreateIncidenciaDto): Promise<Incidencia> {
    // Verificar que la reserva existe
    await this.reservasService.findOne(createIncidenciaDto.reservaId);

    // Verificar que el usuario que reporta existe
    await this.usuariosService.findOne(createIncidenciaDto.reportadoPor);

    const incidencia = this.incidenciaRepository.create(createIncidenciaDto);
    return await this.incidenciaRepository.save(incidencia);
  }

  async findAll(): Promise<Incidencia[]> {
    return await this.incidenciaRepository.find({
      relations: ['reserva', 'usuarioReporta', 'usuarioResuelve'],
      order: { fechaReporte: 'DESC' },
    });
  }

  async findPendientes(): Promise<Incidencia[]> {
    return await this.incidenciaRepository.find({
      where: [
        { estado: EstadoIncidenciaEnum.REPORTADA },
        { estado: EstadoIncidenciaEnum.EN_PROCESO },
      ],
      relations: ['reserva', 'usuarioReporta', 'usuarioResuelve'],
      order: { 
        prioridad: 'DESC', // Ordenar por prioridad
        fechaReporte: 'ASC',
      },
    });
  }

  async findByReserva(reservaId: number): Promise<Incidencia[]> {
    return await this.incidenciaRepository.find({
      where: { reservaId },
      relations: ['reserva', 'usuarioReporta', 'usuarioResuelve'],
      order: { fechaReporte: 'DESC' },
    });
  }

  async findByEstado(estado: EstadoIncidenciaEnum): Promise<Incidencia[]> {
    return await this.incidenciaRepository.find({
      where: { estado },
      relations: ['reserva', 'usuarioReporta', 'usuarioResuelve'],
      order: { fechaReporte: 'DESC' },
    });
  }

  async findByPrioridad(prioridad: PrioridadEnum): Promise<Incidencia[]> {
    return await this.incidenciaRepository.find({
      where: { prioridad },
      relations: ['reserva', 'usuarioReporta', 'usuarioResuelve'],
      order: { fechaReporte: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Incidencia> {
    const incidencia = await this.incidenciaRepository.findOne({
      where: { id },
      relations: ['reserva', 'usuarioReporta', 'usuarioResuelve'],
    });

    if (!incidencia) {
      throw new NotFoundException(`Incidencia con ID ${id} no encontrada`);
    }

    return incidencia;
  }

  async update(
    id: number,
    updateIncidenciaDto: UpdateIncidenciaDto,
  ): Promise<Incidencia> {
    const incidencia = await this.findOne(id);

    Object.assign(incidencia, updateIncidenciaDto);
    return await this.incidenciaRepository.save(incidencia);
  }

  async cambiarEstado(
    id: number,
    nuevoEstado: EstadoIncidenciaEnum,
  ): Promise<Incidencia> {
    const incidencia = await this.findOne(id);
    incidencia.estado = nuevoEstado;
    return await this.incidenciaRepository.save(incidencia);
  }

  async resolver(
    id: number,
    resolverDto: ResolverIncidenciaDto,
  ): Promise<Incidencia> {
    const incidencia = await this.findOne(id);

    if (incidencia.estado === EstadoIncidenciaEnum.RESUELTA) {
      throw new BadRequestException('La incidencia ya está resuelta');
    }

    // Verificar que el usuario que resuelve existe
    await this.usuariosService.findOne(resolverDto.resueltoPor);

    incidencia.estado = EstadoIncidenciaEnum.RESUELTA;
    incidencia.resueltoPor = resolverDto.resueltoPor;
    incidencia.notasResolucion = resolverDto.notasResolucion;
    incidencia.fechaResolucion = new Date();

    return await this.incidenciaRepository.save(incidencia);
  }

  async cerrar(id: number): Promise<Incidencia> {
    const incidencia = await this.findOne(id);

    if (incidencia.estado !== EstadoIncidenciaEnum.RESUELTA) {
      throw new BadRequestException(
        'Solo se pueden cerrar incidencias resueltas',
      );
    }

    incidencia.estado = EstadoIncidenciaEnum.CERRADA;
    return await this.incidenciaRepository.save(incidencia);
  }

  async remove(id: number): Promise<void> {
    const incidencia = await this.findOne(id);
    await this.incidenciaRepository.remove(incidencia);
  }
}