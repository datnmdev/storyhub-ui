import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const authorApi = {
    getAuthorById: (options: RequestInit) => {
        return axiosInstance().get(`/author/${options.params.authorId}`);
    }
}

export default authorApi;