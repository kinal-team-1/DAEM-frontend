import { AllUsers } from "../application/admin-module/users/allUsers";
import { AnonymousCase } from "../application/admin-module/anonymous-case/anonymous-case";

export const adminRoutes = /** @type import("react-router-dom").RouteObject */ [
  {
    path: "user",
    element: <AllUsers />,
  },
  {
    path: "anonymous-case",
    element: <AnonymousCase />,
  },
];
