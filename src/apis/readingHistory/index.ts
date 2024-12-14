import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const readingHistoryApi = {
    getReadingHistoryWithFilter: (options: RequestInit) => {
        return axiosInstance().get("/reading-history/filter", {
            params: options.queries
        })
    },
    createReadingHistory: (options: RequestInit) => {
        return axiosInstance().post("/reading-history", options.body);
    },
    updateReadingHistory: (options: RequestInit) => {
        return axiosInstance().put("/reading-history", options.body);
    },
    deleteReadingHistoryByChapterId: (options: RequestInit) => {
        return axiosInstance().delete("/reading-history/delete-by-chapter-id", {
            params: options.queries
        });
    },
    deleteReadingHistoryByStoryId: (options: RequestInit) => {
        return axiosInstance().delete("/reading-history/delete-by-story-id", {
            params: options.queries
        });
    },
    deleteAllReadingHistory: () => {
        return axiosInstance().delete("/reading-history/all");
    },
}

export default readingHistoryApi;