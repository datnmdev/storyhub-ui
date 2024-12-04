import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const aliasApi = {
    createAlias: (options: RequestInit) => {
        return axiosInstance().post("/alias", options.body);
    },
    getAliasByStoryId: (options: RequestInit) => {
        return axiosInstance().get("/alias/get-by-story-id", {
            params: options.queries
        })
    }
};

export default aliasApi;
