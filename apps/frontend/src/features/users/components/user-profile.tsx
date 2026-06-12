import Link from 'next/link';

import type { VehicleListItem } from '@/features/vehicles/api/vehicles.server';
import { CreateVehicleForm } from '@/features/vehicles/components/create-vehicle-form';
import { VehicleList } from '@/features/vehicles/components/vehicle-list';

import type { UserListItem } from '../api/users.server';

import { DeleteUserButton } from './delete-user-button';
import { UpdateUserForm } from './update-user-form';

interface UserProfileProps {
  user: UserListItem;
  vehicles: VehicleListItem[];
}

export function UserProfile({ user, vehicles }: UserProfileProps) {
  return (
    <div className="grid gap-6">
      <section className="rounded-4xl border border-slate-200 bg-white/90 p-8 shadow-sm">
        <Link
          href="/users"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          Back to users
        </Link>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
          {user.avatar ? (
            <div
              aria-label={`${user.name} avatar`}
              className="h-24 w-24 rounded-3xl bg-slate-200 bg-cover bg-center"
              role="img"
              style={{ backgroundImage: `url(${user.avatar})` }}
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-900 text-2xl font-semibold text-white">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          <div className="space-y-1">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              User profile
            </p>
            <h1 className="text-3xl font-semibold text-slate-950">
              {user.name}
            </h1>
            <p className="text-base text-slate-600">{user.email}</p>
          </div>
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              User ID
            </dt>
            <dd className="mt-2 break-all text-sm text-slate-900">{user.id}</dd>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Avatar
            </dt>
            <dd className="mt-2 break-all text-sm text-slate-900">
              {user.avatar ?? 'No avatar'}
            </dd>
          </div>
        </dl>
      </section>

      <UpdateUserForm user={user} />
      <CreateVehicleForm userId={user.id} />
      <section className="rounded-4xl border border-slate-200 bg-white/90 p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
            Assigned vehicles
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Transport linked to this user
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            All registered transport vehicles connected through the user record.
          </p>
        </div>

        <VehicleList vehicles={vehicles} />
      </section>
      <DeleteUserButton userId={user.id} />
    </div>
  );
}
