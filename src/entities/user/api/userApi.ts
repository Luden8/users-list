import type { SortOptions, UsersResponse, UserDetail } from "./types";
import { PAGE_SIZE } from "./constants";

const BASE_URL = "https://dummyjson.com/users";

const USER_LIST_FIELDS = "id,firstName,lastName,email,phone,age,gender,image,company";

function buildUrl(
  path: string,
  params: Record<string, string | number>,
): string {
  const url = new URL(path);
  for (const [key, value] of Object.entries(params)) {
    if (value !== "" && value != null) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function fetchUsers(
  page: number,
  sort: SortOptions,
  signal?: AbortSignal,
): Promise<UsersResponse> {
  const skip = (page - 1) * PAGE_SIZE;
  const url = buildUrl(BASE_URL, {
    limit: PAGE_SIZE,
    skip,
    select: USER_LIST_FIELDS,
    sortBy: sort.sortBy,
    order: sort.sortBy ? sort.order : "",
  });
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function filterUsers(
  key: string,
  value: string,
  page: number,
  sort: SortOptions,
  signal?: AbortSignal,
): Promise<UsersResponse> {
  const skip = (page - 1) * PAGE_SIZE;
  const url = buildUrl(`${BASE_URL}/filter`, {
    key,
    value,
    limit: PAGE_SIZE,
    skip,
    sortBy: sort.sortBy,
    order: sort.sortBy ? sort.order : "",
  });
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Failed to filter users");
  return res.json();
}

export async function searchUsers(
  query: string,
  page: number,
  sort: SortOptions,
  signal?: AbortSignal,
): Promise<UsersResponse> {
  const skip = (page - 1) * PAGE_SIZE;
  const url = buildUrl(`${BASE_URL}/search`, {
    q: query,
    limit: PAGE_SIZE,
    skip,
    sortBy: sort.sortBy,
    order: sort.sortBy ? sort.order : "",
  });
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Failed to search users");
  return res.json();
}

export async function fetchUser(
  id: number,
  signal?: AbortSignal,
): Promise<UserDetail> {
  const res = await fetch(`${BASE_URL}/${id}`, { signal });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}
