import { RequestInit } from "@apis/api.type"
import axiosInstance from "libs/axios"

const depositeTransactionApi = {
    createPaymentUrl: (options: RequestInit) => {
        return axiosInstance().post("/deposite-transaction/create-payment-url", options.body);
    },
    getPaymentStatus: (options: RequestInit) => {
        return axiosInstance().get("/deposite-transaction/get-payment-status", {
            params: options.queries
        })
    }
}

export default depositeTransactionApi