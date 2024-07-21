import { Home } from "../application/client-module/pages/home/Home";
import { Publish } from "../application/client-module/pages/publish/Publish";
import { PublicCaseById } from "../application/client-module/pages/public-case-by-id/PublicCaseById.jsx";

export const userRoutes = /** @type import("react-router-dom").RouteObject */ [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "publish",
    element: <Publish />,
  },
  {
    path: "publicCase",
    element: <PublicCaseById />,
  },
];
