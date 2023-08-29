import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../pages/homePage";
import AuthPage from "../pages/auth";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/profilePage";
import EmailSent from "../pages/static/emailSent";
import ResetPasswordPage from "../pages/resetPasswordPage";
const APP_ROUTES = (token: string | null) => createBrowserRouter([
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
  {
    path: "/email-sent",
    element: <EmailSent />,
  },
  {
    path: "/reset-password/:token",
    element: token ? <Navigate to={"/"} /> : <ResetPasswordPage />,
  }
]);

export default APP_ROUTES;
