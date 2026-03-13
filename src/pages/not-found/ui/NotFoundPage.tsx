import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <span className="text-6xl font-bold text-gray-200 dark:text-gray-700">
        404
      </span>
      <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Page not found
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Back to home
      </Link>
    </div>
  );
}
