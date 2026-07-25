import { createContext, useContext, useState } from "react";
import { setTokens,clearTokens,getAccessToken } from "../api/tokenService";
import { loginUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(getAccessToken());
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
        const data = await loginUser(username, password);

        setAccessToken(data.access);
        setTokens(data.access, data.refresh);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

  const logout = () => {
    clearTokens();
    setAccessToken(null);
    setUser(null);
};

  const value = {
    accessToken,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;