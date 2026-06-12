import type { CreateVehicleFormValues } from '../types/vehicles.types';

export const CREATE_VEHICLE_DEFAULT_VALUES: CreateVehicleFormValues = {
  make: '',
  model: '',
  year: undefined,
};

export const CREATE_VEHICLE_MESSAGES = {
  description:
    'Register a vehicle for this user and link it through the official owner record.',
  submitIdle: 'Add vehicle',
  submitLoading: 'Saving vehicle...',
  success: 'Vehicle added successfully.',
} as const;
