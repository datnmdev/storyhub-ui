import { memo, useEffect } from "react";
import { GuestProps } from "./Guest.type";
import { useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import { useLocation, useNavigate } from "react-router-dom";
import RouteUtils from "@routers/route.util";
import { TOKEN_KEY } from "@constants/auth.constants";

function Guest({
    children
}: GuestProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useAppSelector(authFeature.authSelector.selectAuthenticated);

    useEffect(() => {
        const tokenString = localStorage.getItem(TOKEN_KEY);
        if (tokenString) {
            navigate(RouteUtils.getRedirectUriBelongTo(tokenString, location))
        }
    }, [isAuthenticated]);

    return children
}

export default memo(Guest);