import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const priceApi = {
    getAllPrices: (options: RequestInit) => {
        return axiosInstance().get("/price", { params: options.queries });
    },
    createPrice: (options: RequestInit) => {
        return axiosInstance().post("/price", options.body);
    },
    updatePrice: (options: RequestInit) => {
        return axiosInstance().put("/price", options.body);
    },
    deletePrice: (options: RequestInit) => {
        return axiosInstance().delete(`/price/${options.queries.id}`);
    },
    getCurrentPrice: (options: RequestInit) => {
        return axiosInstance().get("/price/all/current", {
            params: options.queries
        })
    }
};

export default priceApi;