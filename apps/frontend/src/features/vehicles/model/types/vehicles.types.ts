import type { z } from 'zod';

import type { createVehicleSchema } from '../schemas/create-vehicle.schema';
import type { vehicleListItemSchema } from '../schemas/vehicles.schemas';

export type VehicleListItem = z.infer<typeof vehicleListItemSchema>;
export type CreateVehicleFormValues = z.input<typeof createVehicleSchema>;
export type CreateVehiclePayload = z.output<typeof createVehicleSchema>;
export type CreateVehicleInput = CreateVehiclePayload & {
  userId: string;
};
