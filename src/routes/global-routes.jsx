import { createBrowserRouter, redirect } from "react-router-dom";
import { ContextWrapper } from "../App";
import { adminRoutes } from "./admin-routes";
import { Signup } from "../application/shared/pages/signup/Signup";
import { Login } from "../application/shared/pages/login/Login";
import { AuthProvider } from "../services/auth";
import { UserValidation } from "./validations/UserValidation";
import { SUPPORTED_LANGUAGES } from "../config";
import { validateToken } from "../application/actions/GET/validate-token";
import { PrivateUserRoute } from "./validations/PrivateUserRoute";
import { Layout } from "../application/client-module/pages/Layout";
import { userRoutes } from "./user-routes";
import { LocaleHandler } from "./validations/LocaleHandler";
import { PrivateAdminRoute } from "./validations/AdminUserRoute";
import { AdminLayout } from "../application/admin-module/AdminLayout";
import { ViewProfile } from "../application/shared/pages/view-profile/ViewProfile";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <AuthProvider>
        <UserValidation />
      </AuthProvider>
    ),
    children: [
      {
        loader: async () => {
          const navigatorLocale = navigator.language.split("-").at(0) || "en";
          const isSupported = SUPPORTED_LANGUAGES.includes(navigatorLocale);
          const locale = isSupported ? navigatorLocale : "en";

          const token = localStorage.getItem("token");
          if (!token) return redirect(`${locale}/login`);
          const [user] = await validateToken(token);
          if (!user) return redirect(`${locale}/login`);

          if (user.role === "admin") return redirect(`/${locale}/admin/user`);

          return redirect(`/${locale}/public-case`);
        },
        path: "/",
      },
      {
        path: ":locale",
        element: <ContextWrapper />,
        children: [
          {
            path: "",
            element: <LocaleHandler />,
            children: [
              {
                path: "",
                element: <PrivateUserRoute />,
                children: [
                  {
                    path: "",
                    element: <Layout />,
                    children: [...userRoutes],
                  },
                ],
              },
              {
                path: "admin",
                element: <PrivateAdminRoute />,
                children: [
                  {
                    path: "",
                    element: <AdminLayout />,
                    children: [...adminRoutes],
                  },
                ],
              },
              {
                path: "signup",
                element: <Signup />,
              },
              {
                path: "login",
                element: <Login />,
              },
              {
                path: "user/:userId",
                element: <Layout alternativeBackground />,
                children: [
                  {
                    path: "",
                    element: <ViewProfile />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
