'use client';

import { startTransition, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createVehicleAction } from '../actions/create-vehicle.action';
import {
  CREATE_VEHICLE_DEFAULT_VALUES,
  CREATE_VEHICLE_MESSAGES,
} from '../model/constants/create-vehicle.constants';
import { createVehicleSchema } from '../model/schemas/create-vehicle.schema';
import type { CreateVehicleFormValues } from '../model/types/vehicles.types';

export function useCreateVehicleForm(userId: string) {
  const router = useRouter();
  const [isPending, startSubmitting] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<CreateVehicleFormValues>({
    defaultValues: CREATE_VEHICLE_DEFAULT_VALUES,
    resolver: zodResolver(createVehicleSchema),
  });

  const handleSubmit = form.handleSubmit((values) => {
    setServerError(null);
    setSuccessMessage(null);

    startSubmitting(async () => {
      const result = await createVehicleAction(userId, values);

      if (result.error) {
        setServerError(result.error);
        return;
      }

      form.reset(CREATE_VEHICLE_DEFAULT_VALUES);
      setSuccessMessage(result.success ?? CREATE_VEHICLE_MESSAGES.success);
      startTransition(() => {
        router.refresh();
      });
    });
  });

  return {
    form,
    handleSubmit,
    isPending,
    serverError,
    successMessage,
  };
}
