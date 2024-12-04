
const paths = {
    readerHomePage: () => "/",
    readerStoryInfoPage: (storyId: string = ":storyId") => `/story/${storyId}`,
    signInPage: () => "/sign-in",
    signUpPage: () => "/sign-up",
    otpVerificationPage: () => "/otp-verification",
    forgotPasswordPage: () => "/forgot-password",
    resetPasswordPage: () => "/reset-password",
    readerWalletPage: () => "/wallet",
    readerDepositeTransHistoryPage: () => "/wallet/deposite-transaction-history",
    readerChapterContentPage: (storyId: string | number = ":storyId", chapterId: string | number = ":chapterId") => `/story/${storyId}/chapter/${chapterId}`,
    managerDashboardPage: () => "/manager",
    authorHomePage: () => "/author",
    authorCreateStory: () => "/author/create-story",
    authorStoryDetail: (storyId: string) => `/author/story-detail/${storyId}`,
    authorWallet: () => "/author/wallet",
    authorProfile: () => "/author/profile",
    moderatorHomePage: () => "/moderator",
};

export default paths;