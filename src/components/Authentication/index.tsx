import { memo, useEffect } from "react";
import { AuthenticationProps } from "./Authentication.type";
import { TOKEN_KEY } from "@constants/auth.constants";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import Loading from "@components/Loading";
import { useAppDispatch } from "@hooks/redux.hook";
import authFeature from "@features/auth";

function Authentication({
    children
}: AuthenticationProps) {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useFetch<boolean>(apis.authApi.validateToken, { body: JSON.parse(localStorage.getItem(TOKEN_KEY) as string) })

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (data !== null) {
        // console.log(data);
        
        if (data) {
            dispatch(authFeature.authAction.setAuthenticated(true));
        } else {
            dispatch(authFeature.authAction.setAuthenticated(true));
        }
    }

    return children;
}

export default memo(Authentication)