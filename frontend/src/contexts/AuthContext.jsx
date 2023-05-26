import { useEffect, createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";

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

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    }
  }, [user && user.id]);

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
