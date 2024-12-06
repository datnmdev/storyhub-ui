import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const authorApi = {
    getAuthorById: (options: RequestInit) => {
        return axiosInstance().get(`/author/${options.params.authorId}`);
    },
    getAll: (options: RequestInit) => {
        return axiosInstance().get(`/author`);
    }
}

export default authorApi;