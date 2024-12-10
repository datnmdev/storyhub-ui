import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const moderatorReqApi = {
    getAllModerationReq: (options: RequestInit) => {
        return axiosInstance().get("/moderation-request", {
            params: options.queries,
        });
    },
};

export default moderatorReqApi;
