'use client';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

import { useDeleteUser } from '../hooks/use-delete-user';
import { DELETE_USER_MESSAGES } from '../model/constants/delete-user.constants';

interface DeleteUserButtonProps {
  userId: string;
}

export function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const {
    closeDialog,
    handleDelete,
    isDialogOpen,
    isPending,
    openDialog,
    serverError,
  } = useDeleteUser(userId);

  return (
    <>
      <div className="grid gap-3">
        <div className="rounded-3xl border border-rose-200 bg-rose-50/80 p-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-700">
            Danger zone
          </p>
          <p className="mt-2 text-sm leading-6 text-rose-700">
            {DELETE_USER_MESSAGES.description}
          </p>

          <div className="mt-4">
            <Button
              className="bg-rose-600 hover:bg-rose-500 disabled:bg-rose-300"
              isLoading={isPending}
              onClick={openDialog}
              type="button"
            >
              {isPending
                ? DELETE_USER_MESSAGES.submitLoading
                : DELETE_USER_MESSAGES.submitIdle}
            </Button>
          </div>
        </div>

        {serverError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {serverError}
          </div>
        ) : null}
      </div>

      <ConfirmDialog
        confirmLabel={DELETE_USER_MESSAGES.submitIdle}
        description={DELETE_USER_MESSAGES.confirm}
        isLoading={isPending}
        isOpen={isDialogOpen}
        onCancel={closeDialog}
        onConfirm={handleDelete}
        title="Delete this user?"
      />
    </>
  );
}
