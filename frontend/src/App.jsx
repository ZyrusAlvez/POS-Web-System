import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import Menu from "./pages/Menu";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings/Settings";
import AddEmployee from "./pages/Settings/AddEmployee";
import AddProduct from "./pages/Settings/AddProduct";
import ViewEmployee from "./pages/Settings/ViewEmployee";
import RemoveProduct from "./pages/Settings/RemoveProduct";
import RemoveEmployee from "./pages/Settings/RemoveEmployee";
import EmployeeCard from "./pages/Settings/EmployeeCard";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Menu />
        </ProtectedRoute>
      ),
    },
    {
      path: "/sales",
      element: (
        <ProtectedRoute>
          <Sales />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inventory",
      element: (
        <ProtectedRoute>
          <Inventory />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings/add-product",
      element: (
        <ProtectedRoute>
          <AddProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings/remove-product",
      element: (
        <ProtectedRoute>
          <RemoveProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings/view-employees",
      element: (
        <ProtectedRoute>
          <ViewEmployee />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings/view-employees/:id",
      element: (
        <ProtectedRoute>
          <EmployeeCard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings/add-employee",
      element: (
        <ProtectedRoute>
          <AddEmployee />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings/remove-employee",
      element: (
        <ProtectedRoute>
          <RemoveEmployee />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
