import axiosInstance from "libs/axios";

const fileUploadApi = {
    generateUrlUploadFile: (options: RequestInit) => {
        return axiosInstance().post("/file-upload/generate-upload-url-story", options.body);
    },
};

export default fileUploadApi;
