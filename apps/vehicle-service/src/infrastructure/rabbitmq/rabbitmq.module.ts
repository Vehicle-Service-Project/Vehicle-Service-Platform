import { env } from '../../config/env.js';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_QUEUES, RMQ_CLIENTS } from './rabbitmq.constants.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_CLIENTS.USERS,
        transport: Transport.RMQ,
        options: {
          urls: [env.RABBITMQ_URL!],
          queue: RMQ_QUEUES.USERS,
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMQModule {}
