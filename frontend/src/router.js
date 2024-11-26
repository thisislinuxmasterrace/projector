import {createBrowserRouter} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";
import InvitesPage from "./pages/InvitesPage/InvitesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute/PublicOnlyRoute";
import TaskPage from "./pages/TaskPage/TaskPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute element={<MainPage />} />
    },
    {
        path: "/profile",
        element: <PrivateRoute element={<UserEditPage />} />
    },
    {
        path: "/invites",
        element: <PrivateRoute element={<InvitesPage />} />
    },
    {
        path: "/register",
        element: <PublicOnlyRoute element={<RegisterPage />} />
    },
    {
        path: "/login",
        element: <PublicOnlyRoute element={<LoginPage />} />
    },
    {
        path: "/tasks/:id",
        element: <PrivateRoute element={<TaskPage />} />
    }
]);

export default router;