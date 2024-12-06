import { ChangeEventHandler, FocusEventHandler } from "react";

export interface InputProps {
    type?: "text" | "password" | "email" | "date"
    placeholder?: string,
    value?: string
    name?: string
    max?: string | number
    minLength?: number
    maxLength?: number
    length?: number
    contentEditable?: boolean
    onChange?: ChangeEventHandler<HTMLInputElement>
    onFocus?: FocusEventHandler<HTMLInputElement>
    onBlur?: FocusEventHandler<HTMLInputElement>
}