import { useTheme, ThemeToggle } from "@/features/theme-toggle";
import { AppRouter } from "./router";

export function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-8">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Users
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Browse and search the user catalog
          </p>
        </div>
        <ThemeToggle theme={theme} onToggle={toggle} />
      </header>

      <AppRouter />
    </div>
  );
}
