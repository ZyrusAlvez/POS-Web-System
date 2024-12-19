import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { checkAuth } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Local state to track authentication status
  const [loading, setLoading] = useState(true); // Loading state for async check

  useEffect(() => {
    const verifyAuth = async () => {
      const res = await checkAuth();
      setIsAuthenticated(res); // Set authentication result
      setLoading(false); // Stop loading once check is done
    };

    verifyAuth();
  }, []); // Dependency ensures this runs once unless `checkAuth` changes

  // Show a loading spinner or placeholder during the check
  if (loading) return <div>Loading...</div>;

  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;