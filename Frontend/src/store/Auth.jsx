// TODO: ============================================================= WAREHOUSE ============================================================

import { createContext, useContext, useEffect, useState } from "react";

// context
export const AuthContext = createContext();

//Provider
export const AuthProvider = ({ children }) => {
  // store token
  const [token, setToken] = useState(localStorage.getItem("tokenBookStore"));

  // ?-------------------------------------------------------------- Theme -------------------------------------------------------
  const [themeColor, setThemeColor] = useState("light");

  const theme = () => {
    setThemeColor(themeColor === "light" ? "dark" : "light");
  };

  //? ---------------------------------------------------------------End: Theme -----------------------------------------------

  // definition of storeTokenINLS
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken); // this is the problem and solution : L-37

    localStorage.setItem("tokenBookStore", serverToken);
    return;
  };

  //? tackling the logout functionality
  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("tokenBookStore");
    return;
  };

  // User login or not
  let isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ theme, themeColor, logoutUser, isLoggedIn, storeTokenInLS }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook / function
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }

  return authContextValue;
};
