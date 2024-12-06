import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const viewApi = {
    getViewCountOfStory: (options: RequestInit) => {
        return axiosInstance().get(`/view/count/story/${options.params.storyId}`);
    },
    getViewCountOfChapter: (options: RequestInit) => {
        return axiosInstance().get(`/view/count/chapter/${options.params.chapterId}`);
    },
    getTopViewStory: (options: RequestInit) => {
        return axiosInstance().get(`/view/get-top`, {
            params: options.queries
        });
    }
}

export default viewApi;