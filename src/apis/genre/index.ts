import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios";

const genreApi = {
    getGenreList: () => {
        return axiosInstance().get("/genre");
    },
    getGenreWithFilter: (options: RequestInit) => {
        return axiosInstance().get("/genre/all/filter", {
            params: options.queries
        })
    }
};

export default genreApi;
