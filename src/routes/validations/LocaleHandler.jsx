import { Outlet, useParams } from "react-router-dom";
import { useLocaleService } from "../../services/locale";

export function LocaleHandler() {
  const { locale } = useParams();
  const { locale: currentLocale, setLocale } = useLocaleService();

  if (locale !== currentLocale) {
    console.log("setting locale", locale);
    setLocale(locale);
  }

  return <Outlet />;
}
