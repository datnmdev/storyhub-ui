import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const chapterImageApi = {
    getChapterImages: (options: RequestInit) => {
        return axiosInstance().get(`/chapter-image/all?chapterId=${options.queries.chapterId}`);
    },
    createChapterImages: (options: RequestInit) => {
        return axiosInstance().post(`/chapter-image`, options.body);
    },
    deleteChapterImages: (options: RequestInit) => {
        return axiosInstance().delete(`/chapter-image/${options.queries.id}`);
    },
    updateOrderChapterImages: (options: RequestInit) => {
        return axiosInstance().put(`/chapter-image`, options.body);
    },
};

export default chapterImageApi;
