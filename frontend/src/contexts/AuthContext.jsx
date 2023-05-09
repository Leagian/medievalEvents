import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const CurrentUserContext = createContext();

export const useAuthContext = () => useContext(CurrentUserContext);

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
