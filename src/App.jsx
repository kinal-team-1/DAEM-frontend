import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TypesafeI18n from "../i18n/i18n-react";
import { useLocaleService } from "./services/locale";

export function App() {
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
