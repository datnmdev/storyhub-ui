import Logo from "@assets/icons/logo.png";
import { useTranslation } from "react-i18next";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";
import SignInWithEmailForm from "./components/SignInWithEmailForm";
import IconButton from "@components/IconButton";
import GoogleIcon from "@assets/icons/static/google.png";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import LoadingWrapper from "@components/LoadingWrapper";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@hooks/redux.hook";
import toastFeature from "@features/toast";
import { ToastType } from "@constants/toast.constants";
import { OAuthState } from "@type/auth.type";
import { OAuthStatus } from "@constants/oauth.constants";
import authFeature from "@features/auth";
import SignInPageUtils from "./SignInPage.util";
import { LocationState } from "@type/reactRouterDom.type";

function SignInPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location: Location<LocationState> = useLocation();
    const { t } = useTranslation();
    const [isAuthenticating, setAuthenticating] = useState<boolean>(false);
    const { data: googleOAuth2Url, isLoading: isGettingGoogleOAuth2Url, error: getGoogleOAuth2UrlError, setRefetch: setGetGoogleOAuth2Url } = useFetch<string>(apis.authApi.signInWithGoogle, {}, false);

    useEffect(() => {
        let intervalId: number;
        if (googleOAuth2Url !== null) {
            setAuthenticating(true);
            const oAutWindow = window.open(googleOAuth2Url, "popupWindow");
            intervalId = setInterval(async () => {
                const params = new URLSearchParams(googleOAuth2Url);
                try {
                    const oAuthState: OAuthState = (await apis.authApi.getTokenAfterOAuth({
                        queries: {
                            state: params.get("state")
                        }
                    })).data
                    switch (oAuthState.status) {
                        case OAuthStatus.SUCCEED:
                            oAutWindow?.close();
                            setAuthenticating(false);
                            dispatch(authFeature.authAction.signIn(oAuthState.token));
                            dispatch(toastFeature.toastAction.add({
                                type: ToastType.SUCCESS,
                                title: t("notification.loginSuccess")
                            }));
                            navigate(SignInPageUtils.getRedirectUriBelongTo(oAuthState.token.accessToken, location), {
                                replace: true
                            });
                            clearInterval(intervalId);
                            break;

                        case OAuthStatus.FAILED:
                            oAutWindow?.close();
                            setAuthenticating(false);
                            dispatch(toastFeature.toastAction.add({
                                type: ToastType.ERROR,
                                title: t("reader.signInPage.failedAuth")
                            }));
                            clearInterval(intervalId);
                            break;
                    }
                } catch (error) {
                    oAutWindow?.close();
                    setAuthenticating(false);
                    dispatch(toastFeature.toastAction.add({
                        type: ToastType.ERROR,
                        title: t("notification.undefinedError")
                    }))
                    clearInterval(intervalId);
                }
            }, 1000);
        } else {
            if (getGoogleOAuth2UrlError) {
                dispatch(toastFeature.toastAction.add({
                    type: ToastType.ERROR,
                    title: t("notification.undefinedError")
                }))
            }
        }
        return () => {
            clearInterval(intervalId);
        }
    }, [googleOAuth2Url, getGoogleOAuth2UrlError])

    return (
        <LoadingWrapper
            isLoading={isGettingGoogleOAuth2Url}
            message={t("reader.signInPage.getOAuthUrl")}
        >
            <LoadingWrapper
                isLoading={isGettingGoogleOAuth2Url || isAuthenticating}
                message={t("reader.signInPage.authenticating")}
            >
                <div>
                    <div className="desktop:w-[var(--desktop-container-w)] mx-auto py-8 flex justify-center items-center">
                        <div className="max-w-[415px] p-8 space-y-4 shadow-[0_0_8px_var(--gray)]">
                            <div>
                                <img
                                    className="w-60 mx-auto"
                                    src={Logo}
                                    alt="Logo"
                                />
                            </div>

                            <div>
                                <ul className="flex border-[1px] border-solid border-[var(--gray)] rounded-[4px]">
                                    <li>
                                        <Link
                                            className="block grow text-center w-[180px] py-2.5 bg-[var(--primary)] text-[var(--white)]"
                                            to="#"
                                        >
                                            {t("reader.signInPage.signIn")}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="block grow text-center w-[180px] py-2.5 hover:text-[var(--primary)]"
                                            to="#"
                                        >
                                            {t("reader.signInPage.signUp")}
                                        </Link>
                                    </li>
                                </ul>

                                <div className="mt-6">
                                    <div>
                                        <SignInWithEmailForm />
                                    </div>

                                    <div>
                                        <div className="uppercase font-semibold text-[var(--dark-gray)] text-[0.925rem] text-center py-4">{t("reader.signInPage.or")}</div>
                                        <div className="flex justify-center">
                                            <IconButton
                                                icon={(
                                                    <img
                                                        width={24}
                                                        src={GoogleIcon}
                                                        alt="Google Icon"
                                                    />
                                                )}
                                                width={48}
                                                height={48}
                                                bgColor="var(--white)"
                                                borderRadius="50%"
                                                boxShadow="0 0 4px var(--gray)"
                                                onClick={() => setGetGoogleOAuth2Url({
                                                    value: true
                                                })}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 text-center space-x-1">
                                        <span>{t("reader.signInPage.noAccount")}</span>
                                        <Link
                                            className="text-[var(--primary)] hover:opacity-60"
                                            to="#"
                                        >
                                            {t("reader.signInPage.signUpNow")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingWrapper>
        </LoadingWrapper >
    );
}

export default SignInPage;