import Button from "@components/Button";
import SearchButton from "./components/SearchButton";
import ToggleThemeButton from "./components/ToggleThemeButton";
import ChangeLangButton from "./components/ChangeLangButton";
import Nav from "./components/Nav";
import { useTranslation } from "react-i18next";
import Logo from "./components/Logo";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import paths from "@routers/router.path";
import { useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import User from "./components/User";

function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(authFeature.authSelector.selectAuthenticated);

    return (
        <div className="sticky top-0 left-0 z-[2] border-solid border-b-[1px] border-[var(--gray)] bg-inherit">
            <div
                className={classNames(
                    "desktop:w-[var(--desktop-container-w)] mx-auto flex justify-between leading-[64px]"
                )}
            >
                <div className="flex">
                    <Logo />
                    <Nav />
                </div>

                <div className="flex items-center">
                    <SearchButton />
                    <ToggleThemeButton />
                    <ChangeLangButton />
                    <div className="ml-2">
                        {!isAuthenticated ? (
                            <Button onClick={() => navigate(paths.signInPage())}>
                                {t("reader.header.btn.signIn")}
                            </Button>
                        ) : (
                            <User />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
