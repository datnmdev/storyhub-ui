import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const storyApi = {
    getAllStoriesByAuthor: (options: RequestInit) => {
        return axiosInstance().get("/story", { params: options.queries });
    },
    createStory: (options: RequestInit) => {
        return axiosInstance().post("/story", options.body);
    },
    getStoryDetail: (options: RequestInit) => {
        return axiosInstance().get(`/story/${options.queries.id}`);
    },
    updateStory: (options: RequestInit) => {
        return axiosInstance().put("/story", options.body);
    },
    deleteStory: (options: RequestInit) => {
        return axiosInstance().delete(`/story/${options.queries.id}`);
    },
    getStoryWithFilter: (options: RequestInit) => {
        return axiosInstance().get("/story/all/filter", {
            params: options.queries
        })
    },
    getGenres: (options: RequestInit) => {
        return axiosInstance().get("/story/all/get-genres", {
            params: options.queries
        })
    }
};


export default storyApi;