import type { Filters } from "@/entities/user";

export function filtersFromParams(params: URLSearchParams): Filters {
  const rawOrder = params.get("order");
  return {
    gender: params.get("gender") ?? "",
    ageRange: params.get("age") ?? "",
    department: params.get("dept") ?? "",
    sortBy: params.get("sortBy") ?? "",
    order: rawOrder === "desc" ? "desc" : "asc",
  };
}

export function buildParams(
  page: number,
  query: string,
  filters: Filters,
): Record<string, string> {
  const params: Record<string, string> = {};
  if (query) params.q = query;
  if (page > 1) params.page = String(page);
  if (filters.gender) params.gender = filters.gender;
  if (filters.ageRange) params.age = filters.ageRange;
  if (filters.department) params.dept = filters.department;
  if (filters.sortBy) {
    params.sortBy = filters.sortBy;
    params.order = filters.order;
  }
  return params;
}
