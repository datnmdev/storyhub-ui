import { RequestInit } from "@apis/api.type";
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

export interface ChapterWithInvoiceRelation extends Chapter {
    invoices: any[]
}

export interface ChapterImage {
    id: number
    order: number
    path: string
    chapterId: number
}

export interface ImageContent {
    id: number
    order: number
    name: string
    images: ChapterImage[]
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
    getChapterWithFilter: (options: RequestInit) => {
        return axiosInstance().get("/chapter/all/filter", {
            params: options.queries
        })
    },
    getChapterContent: (options: RequestInit) => {
        return axiosInstance().get("/chapter/reader/content", {
            params: options.queries
        })
    },
    getImage: (options?: RequestInit) => {
        return axiosInstance().get(options?.uri as string, {
            responseType: "blob"
        });
    },
    getChapterWithInvoiceRelation: (options: RequestInit) => {
        return axiosInstance().get("/chapter/all/with-invoice-relation", {
            params: options.queries
        })
    },
}

export default chapterApi;