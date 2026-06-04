import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto.js';

import { PrismaService } from '../infrastructure/prisma/prisma.service.js';

import { UsersEventsPublisher } from './users.producer.js';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly usersEventsPublisher: UsersEventsPublisher,
  ) {}
  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: dto,
    });

    await this.usersEventsPublisher.publishUserCreated(user);
    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOneById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateById(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  deleteById(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
