import React from "react";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return {
        id: decoded.id,
        full_name: decoded.full_name,
        email: decoded.email,
        role: decoded.role,
      };
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = (token, nextUser) => {
    localStorage.setItem("token", token);
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "Admin",
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
