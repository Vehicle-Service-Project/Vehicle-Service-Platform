import type { Params } from 'nestjs-pino';

export type CreatePinoConfigOptions = {
  level: string,
  nodeEnv: string,
  redactPaths?: string[],
  serviceName: string,
};

export function createPinoConfig({
  level,
  nodeEnv,
  redactPaths = [],
  serviceName,
}: CreatePinoConfigOptions): Params {
  const isProduction = nodeEnv === 'production';

  return {
    pinoHttp: {
      level,
      transport: isProduction
        ? undefined
        : {
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: true,
              translateTime: 'SYS:standard',
            },
          },
      redact: {
        paths: redactPaths,
        remove: true,
      },
      customProps: () => ({
        service: serviceName,
      }),
    },
  };
}
