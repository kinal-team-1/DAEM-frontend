import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} DarkModeContextType
 * @property {boolean} isDark
 * @property {React.Dispatch<boolean>} setIsDark
 */

/**
 * @type {React.Context<DarkModeContextType>}
 */
export const DarkModeContext = createContext({
  isDark: false,
  setIsDark: () => {},
});

export function DarkModeProvider({ children }) {
  const htmlRef = useRef(null);

  if (!htmlRef.current) {
    htmlRef.current = document.querySelector("html");
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersDarkMode) {
      htmlRef.current.classList.add("dark");
    }
  }
  const [isDark, setIsDark] = useState(
    htmlRef.current.classList.contains("dark"),
  );

  useEffect(() => {
    if (isDark) {
      htmlRef.current.classList.add("dark");
    } else {
      htmlRef.current.classList.remove("dark");
    }
  }, [isDark]);

  const value = useMemo(() => ({ isDark, setIsDark }), [isDark, setIsDark]);

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDarkModeService = () => {
  return useContext(DarkModeContext);
};
