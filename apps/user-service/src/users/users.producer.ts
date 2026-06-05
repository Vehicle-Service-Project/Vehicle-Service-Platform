import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  RMQ_CLIENTS,
  RMQ_PATTERNS,
} from '../infrastructure/rabbitmq/rabbitmq.constants.js';
import { UserCreatedEvent } from './users.types.js';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersEventsPublisher {
  constructor(
    @Inject(RMQ_CLIENTS.USERS) private readonly rabbitClient: ClientProxy,
  ) {}

  async publishUserCreated(user: UserCreatedEvent) {
    await lastValueFrom(
      this.rabbitClient.emit(RMQ_PATTERNS.USER_CREATED, user),
    );
  }
}
//TODO: use PATTERN OUTBOX later
