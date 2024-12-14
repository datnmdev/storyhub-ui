import classNames from "classnames";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Nav.module.scss";
import { Link, useNavigate } from "react-router-dom";
import paths from "@routers/router.path";
import { StoryType } from "@constants/story.constants";

function Nav() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <nav className="flex font-[350]">
            <Link
                className={classNames("px-2 cursor-pointer", styles.item)}
                to={paths.readerHomePage()}
            >
                {t("reader.header.nav.home")}
            </Link>

            <div
                className={classNames("px-2 cursor-pointer", styles.item)}
                onClick={() => {
                    navigate(paths.storyFilterPage(), {
                        state: {
                            storyType: StoryType.NOVEL
    
                        }
                    })
                    window.location.reload();
                }}
            >
                {t("reader.header.nav.novel")}
            </div>

            <div
                className={classNames("px-2 cursor-pointer", styles.item)}
                onClick={() => {
                    navigate(paths.storyFilterPage(), {
                        state: {
                            storyType: StoryType.COMIC
    
                        }
                    })
                    window.location.reload();
                }}
            >
                {t("reader.header.nav.comic")}
            </div>

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