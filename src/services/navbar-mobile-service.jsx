import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} SearchContextType
 * @property {boolean} isNavbarOpen
 * @property {React.Dispatch<boolean>} setIsNavbarOpen
 */

/**
 * @type {React.Context<SearchContextType>}
 */
const navbarMobileContext = createContext({
  isNavbarOpen: false,
  setIsNavbarOpen: () => {},
});

export function NavbarMobileProvider({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const value = useMemo(
    () => ({ isNavbarOpen, setIsNavbarOpen }),
    [isNavbarOpen, setIsNavbarOpen],
  );

  return (
    <navbarMobileContext.Provider value={value}>
      {children}
    </navbarMobileContext.Provider>
  );
}

NavbarMobileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useNavbarMobileService() {
  return useContext(navbarMobileContext);
}
