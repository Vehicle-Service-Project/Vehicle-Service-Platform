import { fetchJson } from '@/lib/api/fetch-json';

import 'server-only';

import {
  vehicleListItemSchema,
  vehiclesListSchema,
} from '../model/schemas/vehicles.schemas';
import type {
  CreateVehicleInput,
  VehicleListItem,
} from '../model/types/vehicles.types';

const VEHICLES_PREFIX = '/vehicles';

const vehicleServiceBaseUrl =
  process.env.VEHICLE_SERVICE_URL ?? 'http://localhost:4203';

const makeVehiclesUrl = (path = '') =>
  new URL(`${VEHICLES_PREFIX}${path}`, vehicleServiceBaseUrl);

export async function getVehicles() {
  return fetchJson(makeVehiclesUrl(), vehiclesListSchema, {
    next: {
      revalidate: 60,
    },
  });
}

export async function getVehiclesByUserId(userId: string) {
  const url = makeVehiclesUrl();
  url.searchParams.set('userId', userId);

  return fetchJson(url, vehiclesListSchema, {
    next: {
      revalidate: 60,
    },
  });
}

export async function createVehicle(input: CreateVehicleInput) {
  return fetchJson(makeVehiclesUrl(), vehicleListItemSchema, {
    body: JSON.stringify(input),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

export type { VehicleListItem };
