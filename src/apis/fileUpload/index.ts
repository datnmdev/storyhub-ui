import axiosInstance from "libs/axios";

const fileUploadApi = {
    generateUrlUploadFileForStory: (options: RequestInit) => {
        return axiosInstance().post("/file-upload/generate-upload-url-story", options.body);
    },
    generateUrlUploadFileForChapter: (options: RequestInit) => {
        return axiosInstance().post("/file-upload/generate-upload-url-chapter", options.body);
    },
};

export default fileUploadApi;
