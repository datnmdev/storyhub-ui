import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, Token } from "./auth.type";
import { TOKEN_KEY, AUTH_KEY } from "@constants/auth.constants";
import authThunk from "./auth.thunk";

const initialState: Auth = {
    isAuthenticated: null,
    user: null
}

export const authSlice = createSlice({
    name: AUTH_KEY,
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        saveToken: (state, action: PayloadAction<Token>) => {
            localStorage.setItem(TOKEN_KEY, JSON.stringify(action.payload))
        },
        signIn: (state, action: PayloadAction<Token>) => {
            localStorage.setItem(TOKEN_KEY, JSON.stringify(action.payload))
            state.isAuthenticated = true
        },
        signOut: state => {
            localStorage.removeItem(TOKEN_KEY)
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authThunk.getProfile.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})

export const authReducer = authSlice.reducer;
export default authReducer;