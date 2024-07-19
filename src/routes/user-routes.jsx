import { Home } from "../application/pages/home/Home";
import { Publish } from "../application/pages/publish/Publish";

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
