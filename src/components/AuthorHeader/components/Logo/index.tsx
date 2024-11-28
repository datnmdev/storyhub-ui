import LogoIcon from "@assets/icons/logo.png";
import paths from "@routers/router.path";
import { memo } from "react";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to={paths.authorHomePage()}>
            <img className="inline-block w-[124px] h-[58px] object-cover object-center" src={LogoIcon} />
        </Link>
    );
}

export default memo(Logo);
