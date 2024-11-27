import { createBrowserRouter, Outlet } from "react-router-dom";
import ReaderLayout from "@layouts/ReaderLayout";
import SignInPage from "@pages/SignInPage";
import paths from "./router.path";
import ReaderHomePage from "@pages/ReaderHomePage";
import Protected from "@components/Protected";
import AuthorHomePage from "@pages/AuthorHomePage";
import ManagerDashboardPage from "@pages/ManagerDashboardPage";
import ModeratorHomePage from "@pages/ModeratorHomePage";
import { Role } from "@constants/auth.constants";
import Authentication from "@components/Authentication";
import ErrorBoundary from "@components/ErrorBoundary";
import SignUpPage from "@pages/SignUpPage";
import OtpVerificationPage from "@pages/OtpVerificationPage";
import Guest from "@components/Guest";
import ForgotPasswordPage from "@pages/ForgotPasswordPage";
import ResetPasswordPage from "@pages/ResetPasswordPage";
import ReaderWalletPage from "@pages/ReaderWalletPage";
import ReaderDepositeTransHistoryPage from "@pages/ReaderDepositeTransHistoryPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Authentication>
                <Outlet />
            </Authentication>
        ),
        errorElement: <ErrorBoundary />,
        hasErrorBoundary: true,
        children: [
            {
                index: true,
                element: (
                    <ReaderLayout>
                        <ReaderHomePage />
                    </ReaderLayout>
                )
            },
            {
                path: paths.signInPage(),
                element: (
                    <Guest>
                        <ReaderLayout>
                            <SignInPage />
                        </ReaderLayout>
                    </Guest>
                )
            },
            {
                path: paths.signUpPage(),
                element: (
                    <Guest>
                        <ReaderLayout>
                            <SignUpPage />
                        </ReaderLayout>
                    </Guest>
                )
            },
            {
                path: paths.otpVerificationPage(),
                element: (
                    <Guest>
                        <ReaderLayout>
                            <OtpVerificationPage />
                        </ReaderLayout>
                    </Guest>
                )
            },
            {
                path: paths.forgotPasswordPage(),
                element: (
                    <Guest>
                        <ReaderLayout>
                            <ForgotPasswordPage />
                        </ReaderLayout>
                    </Guest>
                )
            },
            {
                path: paths.resetPasswordPage(),
                element: (
                    <Guest>
                        <ReaderLayout>
                            <ResetPasswordPage />
                        </ReaderLayout>
                    </Guest>
                )
            },
            {
                path: paths.readerWalletPage(),
                element: (
                    <Protected role={Role.READER}>
                        <ReaderLayout>
                            <ReaderWalletPage />
                        </ReaderLayout>
                    </Protected>
                )
            },
            {
                path: paths.readerDepositeTransHistoryPage(),
                element: (
                    <Protected role={Role.READER}>
                        <ReaderLayout>
                            <ReaderDepositeTransHistoryPage />
                        </ReaderLayout>
                    </Protected>
                )
            },
            {
                path: paths.managerDashboardPage(),
                element: (
                    <Protected role={Role.MANAGER}>
                        <ReaderLayout>
                            <ManagerDashboardPage />
                        </ReaderLayout>
                    </Protected>
                )
            },
            {
                path: paths.authorHomePage(),
                element: (
                    <Protected role={Role.AUTHOR}>
                        <ReaderLayout>
                            <AuthorHomePage />
                        </ReaderLayout>
                    </Protected>
                )
            },
            {
                path: paths.moderatorHomePage(),
                element: (
                    <Protected role={Role.MODERATOR}>
                        <ReaderLayout>
                            <ModeratorHomePage />
                        </ReaderLayout>
                    </Protected>
                )
            },
        ]
    }
]);

export default router;