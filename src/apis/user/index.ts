import axiosInstance from "libs/axios";

const userApi = {
    getProfile: () => {
        return axiosInstance().get("/user/get-profile");
    },
    updateProfile: (options: RequestInit) => {
        return axiosInstance().put("/user/update-profile", options.body);
    },
};

export default userApi;
