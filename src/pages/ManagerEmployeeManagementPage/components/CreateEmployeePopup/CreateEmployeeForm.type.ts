import { InputData as InputDataType, InputError as InputErrorType } from "hooks/validate.hook";

export interface InputData extends InputDataType {
    cccd: string,
    name: string
    dob: string | undefined,
    gender: string,
    phone: string,
    address: string,
    status: string,
    doj: string | undefined
    avatar: string | undefined
}

export interface InputError extends InputErrorType {
    cccd?: string,
    name?: string
    dob?: string,
    gender?: string,
    phone?: string,
    address?: string,
    status?: string,
    doj?: string
    avatar?: string
}