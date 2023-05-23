import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const CurrentUserContext = createContext();

export const useAuthContext = () => useContext(CurrentUserContext);

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const updateUserAvatar = (avatarUrl) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, avatar: avatarUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const value = useMemo(() => ({ user, setUser, updateUserAvatar }), [user]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
