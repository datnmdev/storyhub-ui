import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const chapterApi = {
    getChapterListForStory: (options: RequestInit) => {
        return axiosInstance().get("/chapter", { params: options.queries });
    },
    createChapter: (options: RequestInit) => {
        return axiosInstance().post("/chapter", options.body);
    },
    updateChapter: (options: RequestInit) => {
        return axiosInstance().put("/chapter", options.body);
    },
    deleteChapter: (options: RequestInit) => {
        return axiosInstance().delete(`/chapter/${options.queries.id}`);
    },
};

export default chapterApi;
