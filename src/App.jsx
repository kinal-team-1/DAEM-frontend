import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TypesafeI18n from "../i18n/i18n-react";
import { LocaleProvider, useLocaleService } from "./services/locale";
import { NavbarMobileProvider } from "./services/navbar-mobile-service";
import { SearchProvider } from "./services/search-bar";
import { DarkModeProvider } from "./services/dark-mode";

const queryClient = new QueryClient();
export function ContextWrapper() {
  return (
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
  );
}

function App() {
  const { locale } = useLocaleService();

  return (
    <TypesafeI18n
      // @ts-ignore
      locale={locale}
    >
      <Outlet />
      <ToastContainer position="bottom-right" className="md:p-auto p-3" />
    </TypesafeI18n>
  );
}
