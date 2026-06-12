import Link from 'next/link';

import type { VehicleListItem } from '../api/vehicles.server';

interface VehicleListProps {
  showOwnerLink?: boolean;
  vehicles: VehicleListItem[];
}

export function VehicleList({
  showOwnerLink = false,
  vehicles,
}: VehicleListProps) {
  if (vehicles.length === 0) {
    return (
      <div className="rounded-4xl border border-dashed border-slate-300 bg-white/70 p-8 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-950">
          No vehicles registered yet
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Once a transport vehicle is linked to a user, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {vehicles.map((vehicle) => (
        <article
          key={vehicle.id}
          className="rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:shadow-md"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                Vehicle #{vehicle.id}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {vehicle.year
                  ? `Production year: ${vehicle.year}`
                  : 'Year not specified'}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Owner ID: {vehicle.userId}
              </div>

              {showOwnerLink ? (
                <Link
                  className="text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                  href={`/users/${vehicle.userId}`}
                >
                  Open owner profile
                </Link>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
