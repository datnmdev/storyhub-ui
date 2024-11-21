import Logo from "@assets/icons/logo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SignInWithEmailForm from "./components/SignInWithEmailForm";
import IconButton from "@components/IconButton";
import GoogleIcon from "@assets/icons/static/google.png";

function SignInPage() {
    const { t } = useTranslation();
    return (
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
    );
}

export default SignInPage;