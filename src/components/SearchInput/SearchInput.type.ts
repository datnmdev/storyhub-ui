import { ChangeEventHandler } from "react"

export interface SearchInputProps {
    placeholder?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
}