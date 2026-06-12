'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useCreateUserForm } from '../hooks/use-create-user-form';
import { CREATE_USER_MESSAGES } from '../model/constants/create-user.constants';

export function CreateUserForm() {
  const { form, handleSubmit, isPending, serverError, successMessage } =
    useCreateUserForm();

  const emailError = form.formState.errors.email?.message;
  const nameError = form.formState.errors.name?.message;

  return (
    <section className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
          Create user
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">
          Add a new teammate
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
          {CREATE_USER_MESSAGES.description}
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <FormField
          autoComplete="name"
          disabled={isPending}
          error={emailError}
          hint="This email will be used as the primary user identifier."
          label="Email"
          placeholder="jane.doe@example.com"
          type="email"
          {...form.register('email')}
        />

        <FormField
          autoComplete="nickname"
          disabled={isPending}
          error={nameError}
          hint="Keep it short and human-friendly."
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
              ? CREATE_USER_MESSAGES.submitLoading
              : CREATE_USER_MESSAGES.submitIdle}
          </Button>
        </div>
      </form>
    </section>
  );
}
