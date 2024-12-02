import { PropsWithChildren } from "react";

export interface SliderProps extends PropsWithChildren {
    markCount?: number
    slideTransitionDelay?: number
}