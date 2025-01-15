import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for initial authentication check

  // Check authentication when app loads
  useEffect(() => {
    checkAuth();
  }, []);

  // Check Auth Function
  const checkAuth = async () => {
    try {
      console.log("checking")
      const response = await axios.get(
        "https://pos-web-system-3.onrender.com/api/user/check-auth", 
        { withCredentials: true } // Include cookies in the request
      );
      setUser(response.data.user); // Set user if authenticated
      console.log("has access")
      return true
    } catch (error) {
      console.error("Auth check failed:", error.response?.data || error.message);
      setUser(null); // Clear user if not authenticated
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Login Function
  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "https://pos-web-system-3.onrender.com/api/user/log-in", 
        credentials, 
        { withCredentials: true } // Pass cookies
      );      
      setUser(response.data.user); // Set logged-in user
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error; // Propagate error to the component for UI feedback
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await axios.post(
        "https://pos-web-system-3.onrender.com/api/user/log-out", 
        {}, 
        { withCredentials: true } // Pass cookies
      );
      setUser(null); // Clear user on logout
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  // Provide user and authentication functions to the app
  return (
    <AuthContext.Provider value={{ user, checkAuth, login, logout }}>
      {!loading && children} {/* Render children after auth check */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
