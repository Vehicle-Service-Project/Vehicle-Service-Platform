'use client';

import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';

interface ConfirmDialogProps {
  cancelLabel?: string;
  confirmLabel?: string;
  description: string;
  isLoading?: boolean;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
}

export function ConfirmDialog({
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  description,
  isLoading = false,
  isOpen,
  onCancel,
  onConfirm,
  title,
}: ConfirmDialogProps) {
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open && !isLoading) {
          onCancel();
        }
      }}
      open={isOpen}
    >
      <DialogContent
        className="rounded-4xl p-6 sm:max-w-md"
        showCloseButton={false}
      >
        <DialogHeader className="gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
            Confirmation
          </p>
          <DialogTitle className="text-2xl font-semibold text-slate-950">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-slate-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2 flex-col-reverse gap-3 border-0 bg-transparent p-0 sm:flex-row sm:justify-end">
          <Button
            disabled={isLoading}
            onClick={onCancel}
            type="button"
            variant="outline"
          >
            {cancelLabel}
          </Button>
          <Button
            className="bg-rose-600 hover:bg-rose-500 disabled:bg-rose-300"
            isLoading={isLoading}
            onClick={onConfirm}
            type="button"
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
