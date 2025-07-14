
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from './AuthContext';

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState(null);
//   const [token, setToken] = useState(null);
//   const navigate = useNavigate();

//   // Load from localStorage after refresh
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedRole = localStorage.getItem("role");

//     if (storedToken && storedRole) {
//       setToken(storedToken);
//       setRole(storedRole);
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // When logging in
//   const loginUser = (receivedToken, receivedRole) => {
//     localStorage.setItem("token", receivedToken);
//     localStorage.setItem("role", receivedRole);
//     setToken(receivedToken);
//     setRole(receivedRole);
//     setIsAuthenticated(true);
//   };

//   // When logging out
//   const logoutUser = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setToken(null);
//     setRole(null);
//     setIsAuthenticated(false);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, token, role, loginUser, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading,setLoading] = useState(true)

  const navigate = useNavigate();

  // ✅ Load auth data on page refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      setIsAuthenticated(true);
    } else {
      // Optional: redirect if no auth found
      // navigate("/login");
    }
    setLoading(false);
    
  }, []);

  // ✅ Login user and store auth info
  const loginUser = (receivedToken, receivedRole) => {
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("role", receivedRole);
    setToken(receivedToken);
    setRole(receivedRole);
    setIsAuthenticated(true);
  };

  // ✅ Logout user and clear data
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("refresh"); // optional
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        role,
        loginUser,
        logoutUser,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
