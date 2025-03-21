import authFeature from "@features/auth";
import themeFeature from "@features/theme";
import toastFeature from "@features/toast";
import { configureStore } from "@reduxjs/toolkit";
import webSocketReducer from "./webSocketSlice";
const store = configureStore({
    reducer: {
        theme: themeFeature.themeReducer,
        auth: authFeature.authReducer,
        toast: toastFeature.toastReducer,
        webSocket: webSocketReducer,
    },
});

export default store;
