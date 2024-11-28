import axiosInstance from "libs/axios";

const genreApi = {
    getGenreList: () => {
        return axiosInstance().get("/genre");
    },
};

export default genreApi;
