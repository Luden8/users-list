import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/userApi";

export function useUserQuery(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: ({ signal }) => fetchUser(id, signal),
    enabled: !isNaN(id) && id > 0,
  });
}
