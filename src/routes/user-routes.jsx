import { Home } from "../application/client-module/pages/home/Home";
import { Publish } from "../application/client-module/pages/publish/Publish";
import { PublicCase } from "../application/client-module/pages/public-case/publicCase.jsx";
import { EditProfile } from "../application/client-module/pages/edit-profile/EditProfile";

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
    path: "public-case",
    element: <PublicCase />,
  },
  {
    path: "edit-profile",
    element: <EditProfile />,
  },
];
