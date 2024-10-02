import {createBrowserRouter} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";
import InvitesPage from "./pages/InvitesPage/InvitesPage";

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
    }
]);

export default router;