
const paths = {
    readerHomePage: () => "/",
    signInPage: () => "/sign-in",
    signUpPage: () => "/sign-up",
    otpVerificationPage: () => "/otp-verification",
    forgotPasswordPage: () => "/forgot-password",
    resetPasswordPage: () => "/reset-password",
    readerWalletPage: () => "/wallet",
    readerDepositeTransHistoryPage: () => "/wallet/deposite-transaction-history",
    managerDashboardPage: () => "/manager",
    authorHomePage: () => "/author",
    authorCreateStory: () => "/author/create-story",
    authorUpdateStory: (storyId: string) => `/author/update-story/${storyId}`,
    authorStoryDetail: (storyId: string) => `/author/story-detail/${storyId}`,
    authorWallet: () => "/author/wallet",
    authorProfile: () => "/author/profile",
    moderatorHomePage: () => "/moderator",
};

export default paths;