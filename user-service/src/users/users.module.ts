import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { RabbitMQModule } from '../infrastructure/rabbitmq/rabbitmq.module.js';
import { UsersEventsPublisher } from './users.producer.js';

@Module({
  imports: [RabbitMQModule],
  controllers: [UsersController],
  providers: [UsersService, UsersEventsPublisher],
})
export class UsersModule {}
