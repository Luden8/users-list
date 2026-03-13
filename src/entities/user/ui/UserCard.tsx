import { memo } from "react";
import { Link } from "react-router-dom";
import type { User } from "../api/types";

interface UserCardProps {
  user: User;
}

export const UserCard = memo(function UserCard({ user }: UserCardProps) {
  return (
    <Link
      to={`/users/${user.id}`}
      className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-gray-700 dark:bg-gray-800"
    >
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        loading="lazy"
        className="h-14 w-14 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold text-gray-900 dark:text-gray-100">
            {user.firstName} {user.lastName}
          </h3>
          <span className="shrink-0 text-sm text-gray-400">{user.age} y.o.</span>
        </div>
        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </p>
        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          {user.phone}
        </p>
        <span className="mt-1 inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          {user.company.name} &middot; {user.company.department}
        </span>
      </div>
    </Link>
  );
});
