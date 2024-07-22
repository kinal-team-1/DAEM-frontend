import { AnonymousCase } from "../application/admin-module/anonymous-case/anonymous-case";

export const adminRoutes = /** @type import("react-router-dom").RouteObject */ [
  {
    path: "",
    element: <div>Hi</div>,
  },
  {
    path: "anonymous-case",
    element: <AnonymousCase />,
  },
];
