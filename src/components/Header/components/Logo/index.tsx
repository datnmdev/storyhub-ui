import LogoIcon from "@assets/imgs/logo.png";
import paths from "@routers/paths";
import { memo } from "react";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to={paths.home()}>
            <img
                className="inline-block w-[124px] h-[58px] object-cover object-center"
                src={LogoIcon}
            />
        </Link>
    );
}

export default memo(Logo);