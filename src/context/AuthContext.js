import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import SnackbarComponent from "../components/common/SnackbarComponent";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [nameInitial, setNameInitial] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
    setSnackbar({
      open: true,
      message: "Logged in successfully",
      severity: "success",
    });
  };

  const logout = () => {
    setSnackbar({
      open: true,
      message: "Logged out successfully",
      severity: "success",
    });
    localStorage.removeItem("imaanToken");
    setUser(null);
    localStorage.removeItem("isAdmin");
    setNameInitial("");
    router.push("/");
  };

  const isAdmin = user?.userType === "admin";

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          isLoggedIn: !!user,
          login,
          logout,
          nameInitial,
          isAdmin,
        }}
      >
        {children}
      </AuthContext.Provider>

      <SnackbarComponent
        message={snackbar.message}
        severity={snackbar.severity}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
