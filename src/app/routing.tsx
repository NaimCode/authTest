import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../pages/homePage";
import AuthPage from "../pages/auth";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/profilePage";
const APP_ROUTES = (token: string|null) => createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: !token ? <Navigate to={"/auth"} /> : <ProfilePage />
  },
  {
    path: "/auth",
    element: token ? <Navigate to={"/profile"} /> : <AuthPage />,
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
