import { Role } from "@constants/auth.constants";
import paths from "@routers/router.path";
import { JwtPayload } from "@type/jwt.type";
import { LocationState } from "@type/reactRouterDom.type";
import { jwtDecode } from "jwt-decode";
import { Location } from "react-router-dom";

const RouteUtils = {
    getRedirectUriBelongTo(token: string, location: Location<LocationState>) {
        const payload = jwtDecode(token) as JwtPayload;
        let route: string;
        switch (payload.role) {
            case Role.MANAGER:
                route = paths.managerDashboardPage();
                break;

            case Role.MODERATOR:
                route = paths.moderatorHomePage();
                break;

            case Role.AUTHOR:
                route = paths.authorHomePage();
                break;

            default:
                route = paths.readerHomePage();
                break;
        }
        if (location.state?.role && location.state.role === payload.role) {
            if (location.state?.from) {
                route = location.state.from;
            }
        }
        return route;
    }
}

export default RouteUtils;