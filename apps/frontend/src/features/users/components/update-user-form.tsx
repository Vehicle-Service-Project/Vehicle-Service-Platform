'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useUpdateUserForm } from '../hooks/use-update-user-form';
import { UPDATE_USER_MESSAGES } from '../model/constants/update-user.constants';
import type { UserListItem } from '../model/types/users.types';

interface UpdateUserFormProps {
  user: UserListItem;
}

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const { form, handleSubmit, isPending, serverError, successMessage } =
    useUpdateUserForm(user);

  const nameError = form.formState.errors.name?.message;

  return (
    <section className="rounded-4xl border border-slate-200 bg-white/90 p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          Update user
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">
          Edit display name
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
          {UPDATE_USER_MESSAGES.description}
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <FormField
          autoComplete="email"
          disabled
          hint="Email is fixed for now and cannot be edited from this form."
          label="Email"
          value={user.email}
        />

        <FormField
          autoComplete="nickname"
          disabled={isPending}
          error={nameError}
          hint="Use a short human-friendly name."
          label="Name"
          placeholder="Jane Doe"
          type="text"
          {...form.register('name')}
        />

        {serverError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {serverError}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        ) : null}

        <div className="flex items-center justify-end pt-2">
          <Button isLoading={isPending} type="submit">
            {isPending
              ? UPDATE_USER_MESSAGES.submitLoading
              : UPDATE_USER_MESSAGES.submitIdle}
          </Button>
        </div>
      </form>
    </section>
  );
}
