
const paths = {
    readerHomePage: () => "/",
    readerStoryInfoPage: (storyId: string = ":storyId") => `/story/${storyId}`,
    readerRankPage: () => `/rank`,
    signInPage: () => "/sign-in",
    signUpPage: () => "/sign-up",
    otpVerificationPage: () => "/otp-verification",
    forgotPasswordPage: () => "/forgot-password",
    resetPasswordPage: () => "/reset-password",
    readerWalletPage: () => "/reader/wallet",
    readerDepositeTransHistoryPage: () => "/reader/wallet/deposite-transaction-history",
    readerInvoiceHistoryPage: () => "/reader/wallet/invoice-history",
    readerChapterContentPage: (storyId: string | number = ":storyId", chapterId: string | number = ":chapterId") => `/story/${storyId}/chapter/${chapterId}`,
    storyFilterPage: () => "/story-filter",
    readerFollowManagementPage: () => "/reader/follow-management",
    managerDashboardPage: () => "/manager",
    managerEmployeeManagementPage: () => "/manager/employee-management",
    authorHomePage: () => "/author",
    authorCreateStory: () => "/author/create-story",
    authorStoryDetail: (storyId: string) => `/author/story-detail/${storyId}`,
    authorWallet: () => "/author/wallet",
    authorProfile: () => "/author/profile",
    moderatorHomePage: () => "/moderator",
};

export default paths;