import { memo } from "react";
import { SunIcon, MoonIcon } from "@/shared/ui";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export const ThemeToggle = memo(function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="rounded-lg border border-gray-300 bg-white p-2 text-gray-600 transition-colors
                 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
});
