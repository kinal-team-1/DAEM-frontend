import { AllUsers } from "../application/admin-module/users/allUsers";
import { AdminLayout } from "../application/admin-module/AdminLayout";
import { AnonymousCase } from "../application/admin-module/anonymous-case/anonymous-case";

export const adminRoutes = /** @type import("react-router-dom").RouteObject */ [
  {
    path: "admin",
    element: <AdminLayout />,
  },
  {
    path: "admin/user",
    element: <AllUsers />,
  },
  {
    path: "anonymous-case",
    element: <AnonymousCase />,
  },
];
