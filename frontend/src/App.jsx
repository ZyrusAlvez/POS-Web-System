import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./pages/Menu";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />
  },
  {
    path: "/sales",
    element: <Sales />
  },
  {
    path: "/inventory",
    element: <Inventory />
  },
  {
    path: "*",
    element: <NotFound />
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App