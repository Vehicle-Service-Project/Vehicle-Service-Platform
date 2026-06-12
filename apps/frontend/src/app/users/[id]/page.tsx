import { notFound } from 'next/navigation';

import { getUserById } from '@/features/users/api/users.server';
import { UserProfile } from '@/features/users/components/user-profile';
import { getVehiclesByUserId } from '@/features/vehicles/api/vehicles.server';
import { ApiError } from '@/lib/api/api-error';

interface UserDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getUserOrNotFound(id: string) {
  try {
    return await getUserById(id);
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      notFound();
    }

    throw error;
  }
}

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const { id } = await params;
  const [user, vehicles] = await Promise.all([
    getUserOrNotFound(id),
    getVehiclesByUserId(id),
  ]);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <UserProfile user={user} vehicles={vehicles} />
      </div>
    </main>
  );
}
