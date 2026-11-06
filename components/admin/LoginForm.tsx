'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login, type LoginState } from '@/app/admin/actions';

const field =
  'w-full rounded-[10px] border border-line-strong bg-field px-4 py-3 text-base text-strong focus:border-accent-ring focus:outline-none focus:ring-[3px] focus:ring-[rgba(19,144,251,.45)]';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-accent px-5 font-display text-[15px] font-bold text-white transition hover:bg-accent-hover disabled:opacity-60"
    >
      {pending ? 'Masuk...' : 'Masuk'}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useFormState<LoginState, FormData>(login, null);
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium text-strong">
        Email
        <input name="email" type="email" autoComplete="username" required className={field} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-strong">
        Kata sandi
        <input name="password" type="password" autoComplete="current-password" required className={field} />
      </label>
      {state && !state.ok && (
        <p role="alert" className="text-sm text-danger">
          {state.message}
        </p>
      )}
      <Submit />
    </form>
  );
}
