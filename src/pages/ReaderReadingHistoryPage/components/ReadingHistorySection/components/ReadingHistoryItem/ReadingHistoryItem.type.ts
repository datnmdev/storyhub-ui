import { Dispatch, SetStateAction } from "react"

export interface ReadingHistoryItemProps {
    data: any
    setReGetReadingHistory: Dispatch<SetStateAction<{ value: boolean }>>
}