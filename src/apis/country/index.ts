import { RequestInit } from "@apis/api.type";
import axiosInstance from "libs/axios"

const countryApi = {
    getCountryList: () => {
        return axiosInstance().get("/country");
    },
    getCountryById: (options: RequestInit) => {
        return axiosInstance().get(`/country/${options.params.countryId}`);
    }
};

export default countryApi;
