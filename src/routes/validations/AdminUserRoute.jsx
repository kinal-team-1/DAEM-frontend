import { Navigate, Outlet } from "react-router-dom";
import { useAuthService } from "../../services/auth";
import { SUPPORTED_LANGUAGES } from "../../config";

export function PrivateAdminRoute() {
  const { user } = useAuthService();

  const locale = window.location.pathname.split("/")[1] || "en";

  if (!SUPPORTED_LANGUAGES.includes(locale)) {
    return <Navigate to="not-found" />;
  }
  if (!user) return <Navigate to="./login" />;

  if (user.role === "user") return <Navigate to={`/${locale}/admin`} />;

  return <Outlet />;
}
