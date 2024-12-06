import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const notificationUserApi = {
    getAllNotificationUser: (options: RequestInit) => {
        return axiosInstance().get("/notification-user/all", { params: options.queries });
    },

    updateNotificationUser: (options: RequestInit) => {
        return axiosInstance().put("/notification-user", options.body);
    },
};

export default notificationUserApi;
