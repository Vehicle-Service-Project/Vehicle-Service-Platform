# Vehicle Service Platform

Monorepo for the Vehicle Service Platform (frontend, backend services, shared packages).

## Requirements

- Node.js >= 22
- npm 11.x (see `packageManager` in root `package.json`)

## Getting started

```bash
npm i
cp .env.example .env
cp apps/user-service/.env.example apps/user-service/.env
cp apps/vehicle-service/.env.example apps/vehicle-service/.env
cp apps/frontend/.env.example apps/frontend/.env.local

docker compose -f docker.compose.yml up -d
npm run dev
```

`npm i` builds `@vsp/backend-shared` automatically via its `prepare` script, so TypeScript and the IDE can resolve shared imports immediately.

`npm run dev` rebuilds workspace dependencies (via Turbo `^build`) before starting apps. Shared package changes apply after `tsc --watch` rebuilds `dist/` and nodemon restarts the affected Nest service.

## Local infrastructure (Docker)

| Service | Host port | Notes |
|---------|-----------|-------|
| PostgreSQL | 5432 | Databases: `user_service`, `vehicle_service` (see `docker/postgres/init-databases.sql`) |
| Redis | 6379 | Sessions (user-service) |
| RabbitMQ | 5672 / 15672 | AMQP / management UI |
| pgAdmin | 5050 | DB admin UI |
| RedisInsight | 5540 | Redis admin UI |

App ports: frontend `3000`, user-service `4200`, vehicle-service `4203`.

If Postgres was already running with the old compose file, recreate the volume so `vehicle_service` DB is created:

```bash
docker compose -f docker.compose.yml down -v
docker compose -f docker.compose.yml up -d
```

## Common commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in dev mode |
| `npm run build` | Build all packages and apps |
| `npm run lint` | Lint all workspaces |
| `npm run test` | Run tests |
| `npm run db:generate` | Regenerate Prisma clients |

## Workspace layout

| Path | Description |
|------|-------------|
| `apps/frontend` | Next.js frontend |
| `apps/user-service` | User/auth NestJS service |
| `apps/vehicle-service` | Vehicle NestJS service |
| `packages/backend-shared` | Shared NestJS utilities (logger, filters) |

## Shared package note

During local dev, `tsc --watch` on `@vsp/backend-shared` rebuilds `dist/`; nodemon restarts Nest apps when `dist/` or app `src/` changes. To rebuild manually:

```bash
npm run build -w @vsp/backend-shared
```
