import { Home } from "../application/client-module/pages/home/Home";
import { Publish } from "../application/client-module/pages/publish/Publish";
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
    path: "edit-profile",
    element: <EditProfile />,
  },
];
