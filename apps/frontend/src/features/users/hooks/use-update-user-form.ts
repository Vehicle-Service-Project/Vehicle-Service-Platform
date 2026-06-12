'use client';

import { startTransition, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateUserNameAction } from '../actions/update-user-name.action';
import {
  getUpdateUserDefaultValues,
  UPDATE_USER_MESSAGES,
} from '../model/constants/update-user.constants';
import { updateUserSchema } from '../model/schemas/update-user.schema';
import type { UpdateUserInput, UserListItem } from '../model/types/users.types';

export function useUpdateUserForm(user: UserListItem) {
  const router = useRouter();
  const [isPending, startSubmitting] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<UpdateUserInput>({
    defaultValues: getUpdateUserDefaultValues(user),
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    form.reset(getUpdateUserDefaultValues(user));
  }, [form, user]);

  const handleSubmit = form.handleSubmit((values) => {
    setServerError(null);
    setSuccessMessage(null);

    startSubmitting(async () => {
      const result = await updateUserNameAction(user.id, values);

      if (result.error) {
        setServerError(result.error);
        return;
      }

      setSuccessMessage(result.success ?? UPDATE_USER_MESSAGES.success);
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
