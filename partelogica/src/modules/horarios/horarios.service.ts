import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Horario } from './entities/horario.entity';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Injectable()
export class HorariosService {
  constructor(
    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,
  ) {}

  async create(createHorarioDto: CreateHorarioDto): Promise<Horario> {
    // Validar que hora fin sea mayor que hora inicio
    if (createHorarioDto.horaInicio >= createHorarioDto.horaFin) {
      throw new BadRequestException(
        'La hora de fin debe ser posterior a la hora de inicio',
      );
    }

    const horario = this.horarioRepository.create(createHorarioDto);
    return await this.horarioRepository.save(horario);
  }

  async findAll(): Promise<Horario[]> {
    return await this.horarioRepository.find({
      order: { horaInicio: 'ASC' },
    });
  }

  async findActivos(): Promise<Horario[]> {
    return await this.horarioRepository.find({
      where: { activo: true },
      order: { horaInicio: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Horario> {
    const horario = await this.horarioRepository.findOne({ where: { id } });

    if (!horario) {
      throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    }

    return horario;
  }

  async update(
    id: number,
    updateHorarioDto: UpdateHorarioDto,
  ): Promise<Horario> {
    const horario = await this.findOne(id);

    // Validar horas si se están actualizando
    const horaInicio = updateHorarioDto.horaInicio || horario.horaInicio;
    const horaFin = updateHorarioDto.horaFin || horario.horaFin;

    if (horaInicio >= horaFin) {
      throw new BadRequestException(
        'La hora de fin debe ser posterior a la hora de inicio',
      );
    }

    Object.assign(horario, updateHorarioDto);
    return await this.horarioRepository.save(horario);
  }

  async toggleActivo(id: number): Promise<Horario> {
    const horario = await this.findOne(id);
    horario.activo = !horario.activo;
    return await this.horarioRepository.save(horario);
  }

  async remove(id: number): Promise<void> {
    const horario = await this.findOne(id);
    await this.horarioRepository.remove(horario);
  }
}