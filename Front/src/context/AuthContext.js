// ** React Imports
import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// ** Defaults
const defaultProvider = {};

const AuthContext = createContext(defaultProvider);

const AuthContextProvider = ({ children }) => {
  // ** State
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getRole = localStorage.getItem("roleName");
    if (getRole === "ADMIN") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      history.push("/");
    }
  }, []);

  const contextValue = {
    setUserLoggedIn,
    userLoggedIn,
    isAdmin,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };