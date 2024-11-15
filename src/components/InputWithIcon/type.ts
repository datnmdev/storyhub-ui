import { ReactElement } from "react";

export interface InputWithIconProps {
    icon?: ReactElement,
    type?: "text" | "password" | "email",
    placeholder?: string
}