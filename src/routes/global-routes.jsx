import { createBrowserRouter } from "react-router-dom";
import { ContextWrapper } from "../App";
import { adminRoutes } from "./admin-routes";
import { userRoutes } from "./user-routes";
import { Layout } from "../application/client-module/pages/Layout";
import { Login } from "../application/shared/pages/Login";

export const router = createBrowserRouter([
  {
    path: ":locale",
    element: <ContextWrapper />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [...userRoutes],
      },
      ...adminRoutes,
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
