import { PopupProps } from "@components/Popup/Popup.type";
import { Dispatch, SetStateAction } from "react";

export interface ReviewDetailReadingHistoryPopupProps extends PopupProps {
    data: any
    setReGetReadingHistory: Dispatch<SetStateAction<{ value: boolean }>>
}