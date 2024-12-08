import { PropsWithChildren } from "react";

export interface PopupProps extends PropsWithChildren {
    title?: string
    width?: number
    minHeight?: number
    onClose?: (e: any) => any
}