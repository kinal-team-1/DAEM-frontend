import { ContextWrapper } from "../App";
import { DarkModeProvider } from "../services/dark-mode";

export const adminRoutes = /** @type import("react-router-dom").RouteObject */ [
  {
    path: "/:locale",
    element: <ContextWrapper />,
    children: [
      {
        path: "",
        element: <div>Hi</div>,
      },
    ],
  },
  // MUST BE LAST ALWAYS
  {
    path: "*",
    element: <DarkModeProvider>{/* <NotFound /> */}</DarkModeProvider>,
  },
];
