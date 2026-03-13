import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedValue } from "@/shared/hooks";
import { useUsersQuery, UserList, PAGE_SIZE, type Filters } from "@/entities/user";
import { SearchInput } from "@/features/search-users";
import { FilterPanel } from "@/features/filter-users";
import { Pagination } from "@/shared/ui";
import { filtersFromParams, buildParams } from "../lib/urlParams";

export function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlPage = Number(searchParams.get("page")) || 1;
  const urlQuery = searchParams.get("q") ?? "";

  // Derive filters from URL — single source of truth
  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams]);

  const [search, setSearch] = useState(urlQuery);
  const debouncedSearch = useDebouncedValue(search, 300);
  const prevDebouncedSearch = useRef(debouncedSearch);

  // Search changed → reset page
  useEffect(() => {
    if (prevDebouncedSearch.current === debouncedSearch) return;
    prevDebouncedSearch.current = debouncedSearch;
    setSearchParams(buildParams(1, debouncedSearch, filters), {
      replace: true,
    });
  }, [debouncedSearch, filters, setSearchParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams(buildParams(page, debouncedSearch, filters));
    },
    [debouncedSearch, filters, setSearchParams],
  );

  const handleFiltersChange = useCallback(
    (next: Filters) => {
      setSearchParams(buildParams(1, debouncedSearch, next), { replace: true });
    },
    [debouncedSearch, setSearchParams],
  );

  const { data, isLoading, isError, isPlaceholderData } = useUsersQuery(
    debouncedSearch,
    urlPage,
    filters,
  );

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <>
      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <div className="mb-6">
        <FilterPanel filters={filters} onChange={handleFiltersChange} />
      </div>

      <UserList users={data?.users} isLoading={isLoading} isError={isError} />

      <div className="mt-6">
        <Pagination
          page={urlPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={isPlaceholderData}
        />
      </div>
    </>
  );
}
