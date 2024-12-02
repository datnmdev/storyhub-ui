import { RequestInit } from "@apis/api.type";
import { AxiosResponse } from "axios";
import axiosInstance from "libs/axios";

export interface Chapter {
    id: number
    order: number
    name: string
    content?: string
    createdAt: string
    updatedAt: string
    storyId: number
}

export type GetChapterWithFilterResponseData = [Chapter[], number]

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
    getChapterWithFilter: (options: RequestInit): Promise<AxiosResponse<GetChapterWithFilterResponseData>> => {
        return axiosInstance().get("/chapter/all/filter", {
            params: options.queries
        })
    }
}

export default chapterApi;