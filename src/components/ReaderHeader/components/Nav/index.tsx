import classNames from "classnames";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";
import paths from "@routers/router.path";

function Nav() {
    const { t } = useTranslation();

    return (
        <nav className="flex font-[350]">
            <Link
                className={classNames("px-2 cursor-pointer", styles.item)}
                to={paths.readerHomePage()}
            >
                {t("reader.header.nav.home")}
            </Link>

            <Link
                className={classNames("px-2 cursor-pointer", styles.item)}
                to="#"
            >
                {t("reader.header.nav.novel")}
            </Link>

            <Link
                className={classNames("px-2 cursor-pointer", styles.item)}
                to="#"
            >
                {t("reader.header.nav.comic")}
            </Link>

            <Link
                className={classNames("px-2 cursor-pointer", styles.item)}
                to={paths.storyFilterPage()}
            >
                {t("reader.header.nav.search")}
            </Link>

            <Link
                className={classNames("px-2 cursor-pointer", styles.item)}
                to={paths.readerRankPage()}
            >
                {t("reader.header.nav.rank")}
            </Link>
        </nav>
    );
}

export default memo(Nav);