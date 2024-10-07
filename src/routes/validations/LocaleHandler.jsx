import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocaleService } from "../../services/locale";
import { SUPPORTED_LANGUAGES } from "../../config";

export function LocaleHandler() {
  const { locale } = useParams();
  const { locale: currentLocale, setLocale } = useLocaleService();

  useEffect(() => {
    if (locale !== currentLocale) {
      if (SUPPORTED_LANGUAGES.includes(locale)) {
        localStorage.setItem("locale", locale);
      }
      setLocale(locale);
    }
  }, [locale]);

  return <Outlet />;
}
