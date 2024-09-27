import {createBrowserRouter} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SecondPage from "./pages/SecondPage/SecondPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/second",
        element: <SecondPage />
    }
]);

export default router;