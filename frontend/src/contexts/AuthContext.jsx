import { useEffect, createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const CurrentUserContext = createContext();

export const useAuthContext = () => useContext(CurrentUserContext);

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // garde les data de l'user même en cas de rafraichissement
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie));
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  const updateUserAvatar = (avatarUrl) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, avatar: avatarUrl };
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
