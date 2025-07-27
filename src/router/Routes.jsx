import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import MainRoutes from "../layouts/MainRoutes";
import AddItems from "../pages/DashboardPage/AddItems";
import AdminHome from "../pages/DashboardPage/AdminHome";
import AllUsers from "../pages/DashboardPage/AllUsers";
import CartPage from "../pages/DashboardPage/CartPage";
import ManageItems from "../pages/DashboardPage/ManageItems";
import Payment from "../pages/DashboardPage/Payment";
import PaymentHistorys from "../pages/DashboardPage/PaymentHistorys";
import UpdateItem from "../pages/DashboardPage/UpdateItem";
import UserHome from "../pages/DashboardPage/UserHome";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MenuPage from "../pages/MenuPage";
import OrderPage from "../pages/OrderPage";
import SecretPage from "../pages/SecretPage";
import SignUpPage from "../pages/SignUpPage";
import AdminRoute from "./AdminRoute";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoutes />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/menus",
        element: <MenuPage />,
      },

      {
        path: "/order/:category",
        element: <OrderPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/secret",
        element: (
          <PrivateRoutes>
            <SecretPage />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard/userHome",
        element: <UserHome />,
      },
      {
        path: "/dashboard/cart",
        element: <CartPage />,
      },
      {
        path: "/dashboard/payment",
        element: <Payment />,
      },
      {
        path: "/dashboard/paymentHistory",
        element: <PaymentHistorys />,
      },
      // admin routes
      {
        path: "/dashboard/adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/addItems",
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageItem",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },
    ],
  },
]);

export default router;
