import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [nameInitial, setNameInitial] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("imaanToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (!isExpired) {
          setUser(decoded);
          localStorage.setItem(
            "isAdmin",
            decoded.userType === "admin" ? "true" : "false"
          );
          const name = decoded.name;
          setNameInitial(name.charAt(0).toUpperCase());
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("imaanToken", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    const name = decoded.name;
    setNameInitial(name.charAt(0).toUpperCase());
  };

  const logout = () => {
    localStorage.removeItem("imaanToken");
    setUser(null);
    localStorage.removeItem("imaanToken");
    localStorage.removeItem("isAdmin");
    setNameInitial("");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, nameInitial }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
