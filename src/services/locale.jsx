import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-unresolved
import { localStorageDetector } from "typesafe-i18n/detectors";
import { detectLocale, i18nObject } from "../../i18n/i18n-util";
// import { loadLocale } from "../../i18n/i18n-util.sync";
import { loadLocaleAsync } from "../../i18n/i18n-util.async";

const LocaleContext = createContext({
  locale: "en",
  setLocale: () => {},
  LL: null,
});

const detectedLocale = detectLocale(localStorageDetector);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(detectedLocale);
  const [LL, setLL] = useState(null);

  useEffect(() => {
    loadLocaleAsync(locale).then(() => {
      const newLocale = i18nObject(locale);
      setLL(() => newLocale);
    });
  }, [locale]);

  return (
    <LocaleContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        locale,
        setLocale: (args) => {
          localStorage.setItem("locale", args);
          setLocale(args);
        },
        LL,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * @typedef { import('../../i18n/i18n-types').TranslationFunctions } TranslationFunctions
 *
 */

/**
 * Hook to access the locale context.
 * @returns {{LL?: TranslationFunctions, locale: string, setLocale: any}}
 */
export const useLocaleService = () => {
  return useContext(LocaleContext);
};
