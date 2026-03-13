import type { User } from "../api/types";
import { UserCard } from "./UserCard";

interface UserListProps {
  users?: User[];
  isLoading: boolean;
  isError: boolean;
}

const gridClass = "grid grid-cols-1 gap-4 md:grid-cols-2";

function SkeletonCard() {
  return (
    <div className="flex animate-pulse gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-14 w-14 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="h-5 w-28 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mt-1 h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-1 h-4 w-36 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 h-5 w-44 rounded-full bg-gray-100 dark:bg-gray-700/50" />
      </div>
    </div>
  );
}

export function UserList({ users, isLoading, isError }: UserListProps) {
  if (isError) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        Failed to load users. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 10 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        No users found.
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
