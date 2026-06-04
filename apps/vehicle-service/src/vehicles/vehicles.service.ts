import { PrismaService } from '../infrastructure/prisma/prisma.service.js';
import { Injectable } from '@nestjs/common';
import { UpdateVehicleDto } from './vehicles.dto.js';
import { UserCreatedPayload } from './vehicles.types.js';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async createDefaultUserVehicle(payload: UserCreatedPayload) {
    await this.prisma.vehicle.create({
      data: {
        userId: payload.id,
        email: payload.email,
        make: 'Unknown',
        model: 'Unknown',
        year: null,
      },
    });
  }

  findAll() {
    return this.prisma.vehicle.findMany();
  }

  findOneById(id: number) {
    return this.prisma.vehicle.findUnique({ where: { id } });
  }

  updateById(id: number, dto: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id },
      data: dto,
    });
  }

  deleteById(id: number) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
