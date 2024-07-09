import { createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { Layout } from "./Layout";
import { LocaleProvider } from "./services/locale";
import { DarkModeProvider } from "./services/dark-mode";
import { SearchProvider } from "./services/search-bar";
import { NavbarMobileProvider } from "./services/navbar-mobile-service";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/:locale",
    element: (
      <QueryClientProvider client={queryClient}>
        <LocaleProvider>
          <DarkModeProvider>
            <SearchProvider>
              <NavbarMobileProvider>
                <App />
              </NavbarMobileProvider>
            </SearchProvider>
          </DarkModeProvider>
        </LocaleProvider>
      </QueryClientProvider>
    ),
    children: [
      {
        path: "",
        element: <Layout />,
      },
    ],
  },
  // MUST BE LAST ALWAYS
  {
    path: "*",
    element: (
      <DarkModeProvider>
        {/* <NotFound /> */}
      </DarkModeProvider>
    ),
  },
]);

export { router };
