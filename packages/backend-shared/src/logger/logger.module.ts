import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import type { Params } from 'nestjs-pino';

@Global()
@Module({})
export class LoggingModule {
  static register(config: Params): DynamicModule {
    return {
      module: LoggingModule,
      imports: [LoggerModule.forRoot(config)],
    };
  }
}
