import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocaleService } from "../../services/locale";

export function LocaleHandler() {
  const { locale } = useParams();
  const { locale: currentLocale, setLocale } = useLocaleService();

  useEffect(() => {
    if (locale !== currentLocale) {
      console.log("setting locale", locale);
      setLocale(locale);
    }
  }, [locale]);

  return <Outlet />;
}
