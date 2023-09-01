// LoginContext.js
import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export function useLogin() {
  return useContext(LoginContext);
}

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Implement your login logic here
    // Update the isLoggedIn state and set cookies if needed
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Implement your logout logic here
    // Update the isLoggedIn state and clear cookies if needed
    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}
export default LoginContext