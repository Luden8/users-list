import { useParams, useNavigate } from "react-router-dom";
import { useUserQuery } from "@/entities/user";
import { ChevronLeftIcon } from "@/shared/ui";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-2 dark:border-gray-800">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {value}
      </span>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {title}
      </h2>
      {children}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-2">
          <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-48 rounded-xl bg-gray-200 dark:bg-gray-700"
        />
      ))}
    </div>
  );
}

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = Number(id);
  const { data: user, isLoading, isError } = useUserQuery(numericId);

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-6 inline-flex cursor-pointer items-center gap-1 rounded text-sm text-gray-500 transition-colors hover:text-gray-900 active:text-gray-700
                   focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none
                   dark:text-gray-400 dark:hover:text-gray-100 dark:active:text-gray-200"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to list
      </button>

      {isLoading && <DetailSkeleton />}

      {isError && (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
          Failed to load user. Please try again later.
        </div>
      )}

      {user && (
        <div className="space-y-6">
          <div className="flex items-center gap-5">
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-20 w-20 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                @{user.username} &middot; {user.role}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Section title="Personal">
              <InfoRow label="Age" value={`${user.age}`} />
              <InfoRow label="Gender" value={user.gender} />
              <InfoRow label="Birth date" value={user.birthDate} />
              {user.maidenName && (
                <InfoRow label="Maiden name" value={user.maidenName} />
              )}
              <InfoRow label="Blood group" value={user.bloodGroup} />
              <InfoRow
                label="Height / Weight"
                value={`${user.height} cm / ${user.weight} kg`}
              />
              <InfoRow label="Eye color" value={user.eyeColor} />
              <InfoRow
                label="Hair"
                value={`${user.hair.color}, ${user.hair.type}`}
              />
            </Section>

            <Section title="Contact">
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Phone" value={user.phone} />
              <InfoRow
                label="Address"
                value={`${user.address.address}, ${user.address.city}`}
              />
              <InfoRow
                label="State"
                value={`${user.address.state}, ${user.address.postalCode}`}
              />
              <InfoRow label="Country" value={user.address.country} />
            </Section>

            <Section title="Company">
              <InfoRow label="Company" value={user.company.name} />
              <InfoRow label="Department" value={user.company.department} />
              <InfoRow label="Title" value={user.company.title} />
            </Section>

            <Section title="Education">
              <InfoRow label="University" value={user.university} />
            </Section>
          </div>
        </div>
      )}
    </div>
  );
}
