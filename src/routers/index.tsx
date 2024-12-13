import { createBrowserRouter, Outlet } from "react-router-dom";
import ReaderLayout from "@layouts/ReaderLayout";
import SignInPage from "@pages/SignInPage";
import paths from "./router.path";
import ReaderHomePage from "@pages/ReaderHomePage";
import Protected from "@components/Protected";
import AuthorHomePage from "@pages/Author/AuthorHomePage";
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
import AuthorLayout from "@layouts/AuthorLayout";
import AuthorCreateStory from "@pages/Author/AuthorCreateStory";
import AuthorStoryDetail from "@pages/Author/AuthorStoryDetail";
import AuthorWallet from "@pages/Author/AuthorWallet";
import AuthorProfile from "@pages/Author/AuthorProfile";
import AuthorUpdateStory from "@pages/Author/AuthorUpdateStory";
import ReaderStoryInfoPage from "@pages/ReaderStoryInfoPage";
import ReaderChapterContentPage from "@pages/ReaderChapterContentPage";
import ReaderInvoiceHistoryPage from "@pages/ReaderInvoiceHistoryPage";
import ReaderStoryFilterPage from "@pages/ReaderStoryFilterPage";
import ManagerLayout from "@layouts/ManagerLayout";
import ManagerEmployeeManagementPage from "@pages/ManagerEmployeeManagementPage";
import ReaderRankPage from "@pages/ReaderRankPage";
import ReaderFollowManagementPage from "@pages/ReaderFollowManagementPage";
import AuthorStatistic from "@pages/Author/AuthorStatistic";
import ModeratorLayout from "@layouts/ModeratorLayout";
import ModeratorProfile from "@pages/ModeratorHomePage/ModeratorProfile";
import ModeratorRegulations from "@pages/Author/regulations/moderatorRegulations";
import AuthorRegulations from "@pages/Author/regulations/authorRegulations";
import ReaderPersonalProfilePage from "@pages/ReaderPersonalProfilePage";

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
                ),
            },
            {
                path: paths.readerStoryInfoPage(),
                element: (
                    <ReaderLayout>
                        <ReaderStoryInfoPage />
                    </ReaderLayout>
                ),
            },
            {
                path: paths.readerRankPage(),
                element: (
                    <ReaderLayout>
                        <ReaderRankPage />
                    </ReaderLayout>
                ),
            },
            {
                path: paths.signInPage(),
                element: (
                    <Guest>
                        <ReaderLayout>
                            <SignInPage />
                        </ReaderLayout>
                    </Guest>
                ),
            },
            {
                path: paths.signUpPage(),
                element: (
                    <Guest>
                        <ReaderLayout>
                            <SignUpPage />
                        </ReaderLayout>
                    </Guest>
                ),
            },
            {
                path: paths.otpVerificationPage(),
                element: (
                    <Guest>
                        <ReaderLayout>
                            <OtpVerificationPage />
                        </ReaderLayout>
                    </Guest>
                ),
            },
            {
                path: paths.forgotPasswordPage(),
                element: (
                    <Guest>
                        <ReaderLayout>
                            <ForgotPasswordPage />
                        </ReaderLayout>
                    </Guest>
                ),
            },
            {
                path: paths.resetPasswordPage(),
                element: (
                    <Guest>
                        <ReaderLayout>
                            <ResetPasswordPage />
                        </ReaderLayout>
                    </Guest>
                ),
            },
            {
                path: paths.readerWalletPage(),
                element: (
                    <Protected role={Role.READER}>
                        <ReaderLayout>
                            <ReaderWalletPage />
                        </ReaderLayout>
                    </Protected>
                ),
            },
            {
                path: paths.readerDepositeTransHistoryPage(),
                element: (
                    <Protected role={Role.READER}>
                        <ReaderLayout>
                            <ReaderDepositeTransHistoryPage />
                        </ReaderLayout>
                    </Protected>
                ),
            },
            {
                path: paths.readerInvoiceHistoryPage(),
                element: (
                    <Protected role={Role.READER}>
                        <ReaderLayout>
                            <ReaderInvoiceHistoryPage />
                        </ReaderLayout>
                    </Protected>
                ),
            },
            {
                path: paths.readerFollowManagementPage(),
                element: (
                    <Protected role={Role.READER}>
                        <ReaderLayout>
                            <ReaderFollowManagementPage />
                        </ReaderLayout>
                    </Protected>
                ),
            },
            {
                path: paths.readerChapterContentPage(),
                element: (
                    <ReaderLayout>
                        <ReaderChapterContentPage />
                    </ReaderLayout>
                ),
            },
            {
                path: paths.storyFilterPage(),
                element: (
                    <ReaderLayout>
                        <ReaderStoryFilterPage />
                    </ReaderLayout>
                ),
            },
            {
                path: paths.readerPersonalProfilePage(),
                element: (
                    <Protected role={Role.READER}>
                        <ReaderLayout>
                            <ReaderPersonalProfilePage />
                        </ReaderLayout>
                    </Protected>
                ),
            },
            {
                path: paths.managerDashboardPage(),
                element: (
                    <Protected role={Role.MANAGER}>
                        <ManagerLayout>
                            <ManagerDashboardPage />
                        </ManagerLayout>
                    </Protected>
                ),
            },
            {
                path: paths.managerEmployeeManagementPage(),
                element: (
                    <Protected role={Role.MANAGER}>
                        <ManagerLayout>
                            <ManagerEmployeeManagementPage />
                        </ManagerLayout>
                    </Protected>
                ),
            },
            {
                path: paths.authorHomePage(),
                element: (
                    <Protected role={Role.AUTHOR}>
                        <AuthorLayout>
                            <Outlet />
                        </AuthorLayout>
                    </Protected>
                ),
                children: [
                    {
                        index: true,
                        element: <AuthorHomePage />,
                    },
                    {
                        path: paths.authorCreateStory(),
                        element: <AuthorCreateStory />,
                    },
                    {
                        path: paths.authorStoryDetail(":storyId"),
                        element: <AuthorStoryDetail />,
                    },
                    {
                        path: paths.authorUpdateStory(":storyId"),
                        element: <AuthorUpdateStory />,
                    },
                    {
                        path: paths.authorWallet(),
                        element: <AuthorWallet />,
                    },
                    {
                        path: paths.authorProfile(),
                        element: <AuthorProfile />,
                    },
                    {
                        path: paths.authorStatistic(),
                        element: <AuthorStatistic />,
                    },
                    {
                        path: paths.authorRegulations(),
                        element: <AuthorRegulations />,
                    },
                ],
            },
            {
                path: paths.moderatorHomePage(),
                element: (
                    <Protected role={Role.MODERATOR}>
                        <ModeratorLayout>
                            <Outlet />
                        </ModeratorLayout>
                    </Protected>
                ),
                children: [
                    {
                        index: true,
                        element: <ModeratorHomePage />,
                    },
                    {
                        path: paths.moderatorProfile(),
                        element: <ModeratorProfile />,
                    },
                    {
                        path: paths.moderatorRegulations(),
                        element: <ModeratorRegulations />,
                    },
                ],
            },
        ],
    },
]);

export default router;
