import axiosInstance from "libs/axios"

const countryApi = {
    getCountryList: () => {
        return axiosInstance().get("/country");
    },
};

export default countryApi;
