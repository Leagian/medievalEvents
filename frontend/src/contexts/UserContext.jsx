import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      .then((response) => {
        setDataUsers(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const value = useMemo(
    () => ({
      dataUsers,
    }),
    [dataUsers]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
