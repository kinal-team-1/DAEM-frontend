import { Navigate, Outlet } from "react-router-dom";
import { useAuthService } from "../../services/auth";
import { SUPPORTED_LANGUAGES } from "../../config";
import { NotEnoughPermissionPage } from "../../application/shared/pages/not-enough-permissions-page/NotEnoughPermissionPage";

export function PrivateAdminRoute() {
  const { user } = useAuthService();

  const locale = window.location.pathname.split("/")[1] || "en";

  if (!SUPPORTED_LANGUAGES.includes(locale)) {
    return <Navigate to="not-found" />;
  }
  if (!user) return <Navigate to="./login" />;

  if (user.role === "user") return <NotEnoughPermissionPage />;

  return <Outlet />;
}
