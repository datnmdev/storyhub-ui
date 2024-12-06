import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const statisticApi = {
    getAllRevenueByTime: (options: RequestInit) => {
        return axiosInstance().get("/statistic/revenue-by-time", { params: options.queries });
    },
};

export default statisticApi;
