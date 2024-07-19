import { Home } from "../application/client-module/pages/home/Home";
import { Publish } from "../application/client-module/pages/publish/Publish";

export const userRoutes = /** @type import("react-router-dom").RouteObject */ [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "publish",
    element: <Publish />,
  },
];
