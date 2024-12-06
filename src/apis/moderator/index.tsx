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
    }
}

export default moderatorApi;