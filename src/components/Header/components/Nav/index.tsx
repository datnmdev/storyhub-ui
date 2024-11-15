import classNames from "classnames";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Nav.module.scss";

function Nav() {
    const { t } = useTranslation();

    return (
        <nav className="flex font-[350]">
            <div className={classNames('px-2 cursor-pointer', styles.item)}>{t("reader.header.nav.home")}</div>
            <div className={classNames('px-2 cursor-pointer', styles.item)}>{t("reader.header.nav.novel")}</div>
            <div className={classNames('px-2 cursor-pointer', styles.item)}>{t("reader.header.nav.comic")}</div>
            <div className={classNames('px-2 cursor-pointer', styles.item)}>{t("reader.header.nav.search")}</div>
            <div className={classNames('px-2 cursor-pointer', styles.item)}>{t("reader.header.nav.rank")}</div>
        </nav>
    );
}

export default memo(Nav);