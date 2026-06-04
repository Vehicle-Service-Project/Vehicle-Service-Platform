import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto, UpdateUserDto } from './users.dto.js';
import { RMQ_PATTERNS } from '../infrastructure/rabbitmq/rabbitmq.constants.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);

    return {
      type: RMQ_PATTERNS.USER_CREATED,
      data: {
        id: user.id,
        email: user.email,
      },
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Put(':id')
  updateById(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateById(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.usersService.deleteById(id);
  }
}
