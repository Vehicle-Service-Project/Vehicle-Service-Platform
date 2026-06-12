import { getVehicles } from '@/features/vehicles/api/vehicles.server';
import { VehicleList } from '@/features/vehicles/components/vehicle-list';

export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
            Vehicle registry
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">
            Transport vehicles
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Administrative view of all registered transport vehicles. Open the
            owner profile to inspect the full linked user record.
          </p>
        </div>

        <VehicleList showOwnerLink vehicles={vehicles} />
      </div>
    </main>
  );
}
