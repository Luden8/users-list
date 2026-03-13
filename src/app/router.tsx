import { Routes, Route } from "react-router-dom";
import { UsersPage } from "@/pages/users";
import { UserDetailPage } from "@/pages/user-detail";
import { NotFoundPage } from "@/pages/not-found";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
