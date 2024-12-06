import { memo } from "react";
import styles from "./Nav.module.scss";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import paths from "@routers/router.path";
const Nav = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex font-[350]">
            <div
                className={classNames(styles.navItem, "px-2 cursor-pointer")}
                onClick={() => navigate(paths.authorHomePage())}
            >
                Truyện
            </div>
            {/* <div className={classNames(styles.navItem, "px-2 cursor-pointer")} onClick={() => navigate(paths.authorWallet())}>
                Ví
            </div> */}
            <div
                className={classNames(styles.navItem, "px-2 cursor-pointer")}
                onClick={() => navigate(paths.authorStatistic())}
            >
                Thống kê
            </div>
        </nav>
    );
};

export default memo(Nav);
