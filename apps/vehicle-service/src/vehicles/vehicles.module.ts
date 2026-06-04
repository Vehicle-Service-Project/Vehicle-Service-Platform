import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller.js';
import { VehiclesService } from './vehicles.service.js';
import { PrismaModule } from '../infrastructure/prisma/prisma.module.js';
import { VehiclesConsumer } from './vehicles.consumer.js';

@Module({
  imports: [PrismaModule],
  controllers: [VehiclesController, VehiclesConsumer],
  providers: [VehiclesService],
})
export class VehiclesModule {}
