import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicles.dto.js';
import { UserCreatedPayload } from './vehicles.types.js';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async createDefaultUserVehicle(payload: UserCreatedPayload) {
    return this.prisma.vehicle.create({
      data: {
        userId: payload.id,
        isDraft: true,
        make: 'Unknown',
        model: 'Unknown',
        year: null,
      },
    });
  }

  async create(dto: CreateVehicleDto) {
    const draftVehicle = await this.prisma.vehicle.findFirst({
      where: {
        userId: dto.userId,
        isDraft: true,
      },
    });

    if (draftVehicle) {
      const vehicle = await this.prisma.vehicle.update({
        where: { id: draftVehicle.id },
        data: {
          make: dto.make,
          model: dto.model,
          year: dto.year ?? null,
          isDraft: false,
        },
      });

      return vehicle;
    }

    const vehicle = await this.prisma.vehicle.create({
      data: {
        userId: dto.userId,
        make: dto.make,
        model: dto.model,
        year: dto.year ?? null,
      },
    });

    return vehicle;
  }

  findAll(userId?: string) {
    return this.prisma.vehicle.findMany({
      where: {
        isDraft: false,
        ...(userId ? { userId } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOneById(id: number) {
    return this.prisma.vehicle.findUnique({ where: { id } });
  }

  async updateById(id: number, dto: UpdateVehicleDto) {
    const vehicle = await this.prisma.vehicle.update({
      where: { id },
      data: dto,
    });

    return vehicle;
  }

  async deleteById(id: number) {
    const vehicle = await this.prisma.vehicle.delete({
      where: { id },
    });

    return vehicle;
  }
}
