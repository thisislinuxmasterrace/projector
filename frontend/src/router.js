import {createBrowserRouter} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";
import InvitesPage from "./pages/InvitesPage/InvitesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/profile",
        element: <UserEditPage />
    },
    {
        path: "/invites",
        element: <InvitesPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    }
]);

export default router;