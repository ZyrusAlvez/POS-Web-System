import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import Menu from "./pages/Menu";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory/Inventory";
import Settings from "./pages/Settings/Settings";
import AddEmployee from "./pages/Settings/AddEmployee";
import AddProduct from "./pages/Settings/AddProduct";
import ViewEmployee from "./pages/Settings/ViewEmployee";
import RemoveProduct from "./pages/Settings/RemoveProduct";
import RemoveEmployee from "./pages/Settings/RemoveEmployee";
import EmployeeCard from "./pages/Settings/EmployeeCard";
import Flavors from "./pages/Inventory/Flavors";
import Products from "./pages/Inventory/Products";
import AddItem from "./pages/Inventory/AddItem";

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
      path: "/inventory/flavors",
      element: (
        <ProtectedRoute>
          <Flavors />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inventory/products",
      element: (
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inventory/materials",
      element: (
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inventory/fruit-tea",
      element: (
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inventory/add-item",
      element: (
        <ProtectedRoute>
          <AddItem />
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
