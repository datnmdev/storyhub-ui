import { PopupProps } from "@components/Popup/Popup.type";
import { InputData as InputDataType, InputError as InputErrorType } from "hooks/validate.hook";
import { Dispatch, SetStateAction } from "react";

export interface CreateEmployeePopupProps extends PopupProps {
    setReGetEmployeeList: Dispatch<SetStateAction<{ value: boolean }>>
}

export interface InputData extends InputDataType {
    email: string
    cccd: string
    name: string
    dob: string | undefined
    gender: string
    phone: string
    address: string
    status: string
    doj: string | undefined
}

export interface InputError extends InputErrorType {
    email?: string
    cccd?: string
    name?: string
    dob?: string
    gender?: string
    phone?: string
    address?: string
    status?: string
    doj?: string
}