import { memo } from "react";
import { SearchIcon } from "@/shared/ui";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = memo(function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search users by name..."
        aria-label="Search users by name"
        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10
                   text-gray-900 placeholder-gray-400 outline-none
                   focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20
                   dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100
                   dark:placeholder-gray-500 dark:focus-visible:border-indigo-400"
      />
    </div>
  );
});
