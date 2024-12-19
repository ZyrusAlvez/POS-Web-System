import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Login";
import Menu from "./pages/Menu";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import NotFound from "./pages/NotFound";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Menu/>
        </ProtectedRoute>
      )
    },
    {
      path: "/sales",
      element: (
        <ProtectedRoute>
          <Sales />
        </ProtectedRoute>
      )
    },
    {
      path: "/inventory",
      element: (
        <ProtectedRoute>
          <Inventory />
        </ProtectedRoute>
      )
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;