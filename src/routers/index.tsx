import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "@pages/ErrorPage";
import ReaderLayout from "@layouts/ReaderLayout";
import SignInPage from "@pages/SignInPage";
import paths from "./paths";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
            {
                element: (
                    <ReaderLayout>
                        <Outlet />
                    </ReaderLayout>
                ),
                children: [
                    {
                        path: paths.signInPage(),
                        element: <SignInPage />
                    }
                ]
            }
        ]
    }
]);

export default router;