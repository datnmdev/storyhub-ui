import { RequestInit } from "@apis/api.type"
import { Dispatch, SetStateAction } from "react"

export interface EmployeeListProps {
    data: any
    requestInit: RequestInit
    setRequestInit: Dispatch<SetStateAction<RequestInit>>
}