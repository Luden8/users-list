import { memo } from "react";
import { DEPARTMENTS, AGE_RANGES, type Filters } from "@/entities/user";
import { DEFAULT_FILTERS } from "../model/constants";

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const selectClass =
  "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus-visible:border-indigo-400";

export const FilterPanel = memo(function FilterPanel({ filters, onChange }: FilterPanelProps) {
  function update(patch: Partial<Filters>) {
    onChange({ ...filters, ...patch });
  }

  const hasActiveFilters =
    filters.gender || filters.ageRange || filters.department || filters.sortBy;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={filters.gender}
        onChange={(e) => update({ gender: e.target.value })}
        aria-label="Filter by gender"
        className={selectClass}
      >
        <option value="">All genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select
        value={filters.ageRange}
        onChange={(e) => update({ ageRange: e.target.value })}
        aria-label="Filter by age range"
        className={selectClass}
      >
        {AGE_RANGES.map((r) => (
          <option key={r.label} value={r.min === 0 ? "" : r.label}>
            {r.label}
          </option>
        ))}
      </select>

      <select
        value={filters.department}
        onChange={(e) => update({ department: e.target.value })}
        aria-label="Filter by department"
        className={selectClass}
      >
        <option value="">All departments</option>
        {DEPARTMENTS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={filters.sortBy ? `${filters.sortBy}:${filters.order}` : ""}
        aria-label="Sort order"
        onChange={(e) => {
          if (!e.target.value) {
            update({ sortBy: "", order: "asc" });
          } else {
            const [sortBy, order] = e.target.value.split(":");
            update({ sortBy, order: order as "asc" | "desc" });
          }
        }}
        className={selectClass}
      >
        <option value="">Default order</option>
        <option value="firstName:asc">Name A–Z</option>
        <option value="firstName:desc">Name Z–A</option>
        <option value="age:asc">Age ↑</option>
        <option value="age:desc">Age ↓</option>
      </select>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="text-sm text-gray-500 transition-colors hover:text-gray-900 active:text-gray-700 dark:text-gray-400 dark:hover:text-gray-100 dark:active:text-gray-200"
        >
          Clear filters
        </button>
      )}
    </div>
  );
});
