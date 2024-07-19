import { Path } from "leaflet";
import { element } from "prop-types";
import { Home } from "../application/client-module/pages/home/Home";
import { Publish } from "../application/client-module/pages/publish/Publish";
import { PublicCase } from "../application/client-module/pages/public-cases/PublicCase";

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
    element: <PublicCase />,
  },
];
