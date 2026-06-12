import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { env } from '../../config/env.js';
import { RMQ_CLIENTS, RMQ_QUEUES } from './rabbitmq.constants.js';

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
