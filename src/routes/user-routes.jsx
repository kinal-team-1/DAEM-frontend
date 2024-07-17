import { ContextWrapper } from "../App";
import { DarkModeProvider } from "../services/dark-mode";
import { Home } from "../application/pages/home/Home.jsx";

export const userRoutes = /** @type import("react-router-dom").RouteObject */ [
  {
    path: "/:locale",
    element: <ContextWrapper />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  // MUST BE LAST ALWAYS
  {
    path: "*",
    element: <DarkModeProvider>{/* <NotFound /> */}</DarkModeProvider>,
  },
];
