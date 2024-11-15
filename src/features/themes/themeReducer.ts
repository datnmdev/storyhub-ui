import { createSlice } from "@reduxjs/toolkit";
import { IThemeState } from "./type";

const initialState: IThemeState = {
    value: "light"
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggle: state => {
            if (state.value === "light") {
                state.value = "dark";
            } else {
                state.value = "light";
            }
        }
    }
});

const themeReducer = themeSlice.reducer;

export default themeReducer;