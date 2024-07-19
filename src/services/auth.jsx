import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {import("../types").User} User
 */

/**
 *
 * @type {React.Context<{user?: User, setUser: React.Dispatch<User>}>}
 */
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuthService() {
  return useContext(AuthContext);
}
