import Button from "@components/Button";
import SearchButton from "./components/SearchButton";
import ToggleThemeButton from "./components/ToggleThemeButton";
import ChangeLangButton from "./components/ChangeLangButton";
import Nav from "./components/Nav";
import { useTranslation } from "react-i18next";
import Logo from "./components/Logo";
import classNames from "classnames";

function Header() {
    const { t } = useTranslation();

    return (
        <div className={classNames("desktop:w-[var(--desktop-w-container)] mx-auto flex justify-between leading-[64px]")} >
            <div className="flex">
                <Logo />
                <Nav />
            </div>

            <div className="flex items-center">
                <SearchButton />
                <ToggleThemeButton />
                <ChangeLangButton />
                <div className="ml-2">
                    <Button>
                        {t("reader.header.btn.signIn")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Header;