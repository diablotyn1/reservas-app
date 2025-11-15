import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { EspaciosService } from '../espacios/espacios.service';
import { HorariosService } from '../horarios/horarios.service';
import { EstadoReservaEnum } from '../../common/enums/estado-reserva.enum';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    private readonly usuariosService: UsuariosService,
    private readonly espaciosService: EspaciosService,
    private readonly horariosService: HorariosService,
  ) {}

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    // Validar que el usuario existe
    await this.usuariosService.findOne(createReservaDto.usuarioId);

    // Validar que el espacio existe y está disponible
    const espacio = await this.espaciosService.findOne(createReservaDto.espacioId);
    if (!espacio.disponible) {
      throw new BadRequestException('El espacio no está disponible');
    }

    // Validar que el horario existe y está activo
    const horario = await this.horariosService.findOne(createReservaDto.horarioId);
    if (!horario.activo) {
      throw new BadRequestException('El horario no está activo');
    }

    // Validar que la fecha sea hoy o futura
    const fechaReserva = new Date(createReservaDto.fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaReserva < hoy) {
      throw new BadRequestException('No se pueden hacer reservas en fechas pasadas');
    }

    // Verificar disponibilidad (no debe existir reserva activa para ese espacio, horario y fecha)
    const reservaExistente = await this.reservaRepository.findOne({
      where: {
        espacioId: createReservaDto.espacioId,
        horarioId: createReservaDto.horarioId,
        fecha: fechaReserva,
        estado: EstadoReservaEnum.ACTIVA,
      },
    });

    if (reservaExistente) {
      throw new ConflictException(
        'Ya existe una reserva activa para este espacio, horario y fecha',
      );
    }

    const reserva = this.reservaRepository.create({
      ...createReservaDto,
      fecha: fechaReserva,
    });

    return await this.reservaRepository.save(reserva);
  }

  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      relations: ['usuario', 'espacio', 'horario'],
      order: { fecha: 'DESC', createdAt: 'DESC' },
    });
  }

  async findByUsuario(usuarioId: number): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      where: { usuarioId },
      relations: ['usuario', 'espacio', 'horario'],
      order: { fecha: 'DESC' },
    });
  }

  async findByEspacio(espacioId: number): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      where: { espacioId },
      relations: ['usuario', 'espacio', 'horario'],
      order: { fecha: 'DESC' },
    });
  }

  async findByEstado(estado: EstadoReservaEnum): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      where: { estado },
      relations: ['usuario', 'espacio', 'horario'],
      order: { fecha: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['usuario', 'espacio', 'horario', 'incidencias'],
    });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    return reserva;
  }

  async verificarDisponibilidad(
    espacioId: number,
    horarioId: number,
    fecha: string,
  ): Promise<boolean> {
    const fechaReserva = new Date(fecha);
    
    const reservaExistente = await this.reservaRepository.findOne({
      where: {
        espacioId,
        horarioId,
        fecha: fechaReserva,
        estado: EstadoReservaEnum.ACTIVA,
      },
    });

    return !reservaExistente; // true si está disponible
  }

  async update(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.findOne(id);

    Object.assign(reserva, updateReservaDto);
    return await this.reservaRepository.save(reserva);
  }

  async cancelar(id: number): Promise<Reserva> {
    const reserva = await this.findOne(id);

    if (reserva.estado === EstadoReservaEnum.CANCELADA) {
      throw new BadRequestException('La reserva ya está cancelada');
    }

    reserva.estado = EstadoReservaEnum.CANCELADA;
    return await this.reservaRepository.save(reserva);
  }

  async completar(id: number): Promise<Reserva> {
    const reserva = await this.findOne(id);

    if (reserva.estado !== EstadoReservaEnum.ACTIVA) {
      throw new BadRequestException('Solo se pueden completar reservas activas');
    }

    reserva.estado = EstadoReservaEnum.COMPLETADA;
    return await this.reservaRepository.save(reserva);
  }

  async remove(id: number): Promise<void> {
    const reserva = await this.findOne(id);
    await this.reservaRepository.remove(reserva);
  }
}