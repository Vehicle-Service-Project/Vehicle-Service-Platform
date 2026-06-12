import type { InputHTMLAttributes, ReactNode } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  hint?: string;
  label: string;
  leading?: ReactNode;
}

export function FormField({
  error,
  hint,
  id,
  label,
  leading,
  className = '',
  ...props
}: FormFieldProps) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>

      <div
        className={`flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 transition ${
          error
            ? 'border-rose-300 ring-2 ring-rose-100'
            : 'border-slate-200 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200'
        }`}
      >
        {leading ? (
          <span className="text-sm font-medium text-slate-400">{leading}</span>
        ) : null}

        <input
          {...props}
          className={`w-full border-0 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 ${className}`.trim()}
          id={id}
        />
      </div>

      {error ? (
        <span className="text-sm text-rose-600">{error}</span>
      ) : hint ? (
        <span className="text-sm text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
}
