import { PropsWithChildren, ReactElement } from "react";

export interface IconButtonProps extends PropsWithChildren {
    icon: ReactElement,
    width?: number,
    height?: number,
    borderRadius?: string,
    padding?: string,
    onClick?: () => void
}