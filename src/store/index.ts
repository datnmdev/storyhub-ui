import themeFeature from "@features/themes";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        theme: themeFeature.themeReducer
    },
});
export default store;