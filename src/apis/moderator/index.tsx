import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const moderatorApi = {
    getModerators: (options: RequestInit) => {
        return axiosInstance().get('/moderator', {
            params: options.queries
        })
    },
    createModerator: (options: RequestInit) => {
        return axiosInstance().post('/moderator', options.body);
    },
    checkCccd: (options: RequestInit) => {
        return axiosInstance().get("/moderator/check-cccd", {
            params: options.queries
        })
    }
}

export default moderatorApi;