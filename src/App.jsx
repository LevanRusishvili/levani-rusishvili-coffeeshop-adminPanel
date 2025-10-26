import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { CoffeeProvider } from "./context/CoffeeContext";
import Navbar from "./components/layout/Navbar"; // Make sure this path is correct
import Dashboard from "./pages/Dashboard";
1;
import AddCoffee from "./pages/AddCoffee";
import Ingredients from "./pages/Ingredients";
import EditCoffee from "./pages/EditCoffee";
import CoffeeDetails from "./pages/CoffeeDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="app-container">
        <Navbar />
      </div>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "add-coffee", element: <AddCoffee /> },
      { path: "edit-coffee", element: <EditCoffee /> },
      { path: "coffee-details", element: <CoffeeDetails /> },
      { path: "ingredients", element: <Ingredients /> },
    ],
  },
]);

const App = () => {
  return (
    <CoffeeProvider>
      <RouterProvider router={router} />
    </CoffeeProvider>
  );
};

export default App;
