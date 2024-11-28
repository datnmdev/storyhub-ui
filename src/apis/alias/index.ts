import axiosInstance from "libs/axios";

const aliasApi = {
    createAlias: (options: RequestInit) => {
        return axiosInstance().post("/alias", options.body);
    },
};

export default aliasApi;
