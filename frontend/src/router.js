import {createBrowserRouter} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/profile",
        element: <UserEditPage />
    }
]);

export default router;