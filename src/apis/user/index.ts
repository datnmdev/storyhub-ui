import axiosInstance from "libs/axios"

const userApi = {
    getProfile: () => {
        return axiosInstance().get("/user/get-profile");
    }
}

export default userApi