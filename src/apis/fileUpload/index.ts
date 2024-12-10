import { RequestInit } from "@apis/api.type";
import axios from "axios";
import axiosInstance from "libs/axios";

const fileUploadApi = {
    generateUrlUploadFileForStory: (options: RequestInit) => {
        return axiosInstance().post("/file-upload/generate-upload-url-story", options.body);
    },
    generateUrlUploadFileForChapter: (options: RequestInit) => {
        return axiosInstance().post("/file-upload/generate-upload-url-chapter", options.body);
    },
    generateUrlUploadFileForProfile: (options: RequestInit) => {
        return axiosInstance().post("/file-upload/generate-upload-url-user", options.body);
    },
    getPreUploadUrl: (options: RequestInit) => {
        return axiosInstance().get("/file-upload/get-pre-upload-avatar-url", {
            params: options.queries,
        });
    },
    upload: (options: RequestInit) => {
        return axios.put(options.uri!, options.body);
    },
};

export default fileUploadApi;
