import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchUsers, searchUsers, filterUsers } from "../api/userApi";
import { AGE_RANGES } from "../api/constants";
import type { Filters, UsersResponse } from "../api/types";

/**
 * Client-side filters complement server-side filtering.
 * Age filter and cross-filters (e.g. gender+department) are applied here.
 * Note: client-side filtering only affects the current page,
 * so pagination totals may be inaccurate when these filters are active.
 */
function applyClientFilters(
  data: UsersResponse,
  filters: Filters,
  serverFilterKey: string,
): UsersResponse {
  let users = data.users;

  if (filters.gender && serverFilterKey !== "gender") {
    users = users.filter((u) => u.gender === filters.gender);
  }

  if (filters.department && serverFilterKey !== "company.department") {
    users = users.filter((u) => u.company.department === filters.department);
  }

  if (filters.ageRange) {
    const range = AGE_RANGES.find((r) => r.label === filters.ageRange);
    if (range && range.min > 0) {
      users = users.filter((u) => u.age >= range.min && u.age <= range.max);
    }
  }

  if (users === data.users) return data;
  return { ...data, users };
}

export function useUsersQuery(
  search: string,
  page: number,
  filters: Filters,
) {
  return useQuery({
    queryKey: ["users", search, page, filters],
    queryFn: async ({ signal }) => {
      const trimmed = search.trim();
      let data: UsersResponse;
      let serverFilterKey = "";

      if (trimmed) {
        data = await searchUsers(trimmed, page, filters, signal);
      } else if (filters.gender) {
        serverFilterKey = "gender";
        data = await filterUsers("gender", filters.gender, page, filters, signal);
      } else if (filters.department) {
        serverFilterKey = "company.department";
        data = await filterUsers(
          "company.department",
          filters.department,
          page,
          filters,
          signal,
        );
      } else {
        data = await fetchUsers(page, filters, signal);
      }

      return applyClientFilters(data, filters, serverFilterKey);
    },
    placeholderData: keepPreviousData,
  });
}
