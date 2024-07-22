import { AllUsers } from "../application/admin-module/users/allUsers";
import { AdminLayout } from "../application/admin-module/AdminLayout";

export const adminRoutes = /** @type import("react-router-dom").RouteObject */ [
  {
    path: "admin",
    element: <AdminLayout />,
  },
  {
    path: "admin/user",
    element: <AllUsers />,
  },
];
