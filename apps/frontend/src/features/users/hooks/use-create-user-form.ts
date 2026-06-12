'use client';

import { startTransition, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createUserAction } from '../actions/create-user.action';
import {
  CREATE_USER_DEFAULT_VALUES,
  CREATE_USER_MESSAGES,
} from '../model/constants/create-user.constants';
import { createUserSchema } from '../model/schemas/create-user.schema';
import type { CreateUserInput } from '../model/types/users.types';

export function useCreateUserForm() {
  const router = useRouter();
  const [isPending, startSubmitting] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<CreateUserInput>({
    defaultValues: CREATE_USER_DEFAULT_VALUES,
    resolver: zodResolver(createUserSchema),
  });

  const handleSubmit = form.handleSubmit((values) => {
    setServerError(null);
    setSuccessMessage(null);

    startSubmitting(async () => {
      const result = await createUserAction(values);

      if (result.error) {
        setServerError(result.error);
        return;
      }

      form.reset(CREATE_USER_DEFAULT_VALUES);
      setSuccessMessage(result.success ?? CREATE_USER_MESSAGES.success);
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
