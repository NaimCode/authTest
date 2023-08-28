import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../pages/homePage";
import AuthPage from "../pages/auth";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
const APP_ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        index: true,
        element: <Navigate to={"login"} />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "registration",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default APP_ROUTES;