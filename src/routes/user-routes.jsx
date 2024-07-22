import { Home } from "../application/client-module/pages/home/Home";
import { Publish } from "../application/client-module/pages/publish/Publish";
import { PublicCaseById } from "../application/client-module/pages/public-case-by-id/PublicCaseById";
import { PublicCase } from "../application/client-module/pages/public-case/publicCase";
import { EditProfile } from "../application/client-module/pages/edit-profile/EditProfile";
import { AllUsers } from "../application/admin-module/users/allUsers";

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
    path: "public-case/:id",
    element: <PublicCaseById />,
  },
  {
    path: "public-case",
    element: <PublicCase />,
  },
  {
    path: "user",
    element: <AllUsers />,
  },
  {
    path: "edit-profile",
    element: <EditProfile />,
  },
];
