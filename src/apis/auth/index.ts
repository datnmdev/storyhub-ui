import { RequestInit } from "@apis/api.type"
import axiosInstance from "libs/axios"

const authApi = {
    signInWithEmailPassword: (options: RequestInit) => {
        return axiosInstance().post("/auth/sign-in/email-password", options.body);
    },
    signInWithGoogle: () => {
        return axiosInstance().get("/auth/sign-in/google");
    },
    getTokenAfterOAuth: (options: RequestInit) => {
        return axiosInstance().get("/auth/sign-in/google/get-token", {
            params: options.queries
        });
    },
    validateToken: () => {
        return axiosInstance().post("/auth/validate-token");
    },
    refreshToken: (options: RequestInit) => {
        return axiosInstance().post("/auth/refresh-token", options.body);
    },
    signOut: (options: RequestInit) => {
        return axiosInstance().post("/auth/sign-out", options.body);
    },
    signUp: (options: RequestInit) => {
        return axiosInstance().post("/auth/sign-up", options.body);
    },
    validateEmail: (options: RequestInit) =>{
        return axiosInstance().get("/auth/validate-email", {
            params: options.queries
        })
    },
    verifyAccount: (options: RequestInit) => {
        return axiosInstance().post("/auth/verify-account", options.body);
    },
    resendOtp: (options: RequestInit) => {
        return axiosInstance().post("/auth/resend-otp", options.body);
    }
}

export default authApi