import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const userApi = {
    getProfile: () => {
        return axiosInstance().get("/user/get-profile");
    },
    updateProfile: (options: RequestInit) => {
        return axiosInstance().put("/user/update-profile", options.body);
    },
    updateProfileInfo: (options: RequestInit) => {
        return axiosInstance().put("/user", options.body)
    }
};

export default userApi;
