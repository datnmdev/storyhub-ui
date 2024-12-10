import { memo } from "react"
import { ActivityHistoryProps } from "./ActivityHistoryPopup.type";
import Popup from "@components/Popup";

function ActivityHistoryPopup({
    onClose,
    data
}: ActivityHistoryProps) {
    return (
        <Popup
            title=""
            onClose={onClose}
        >

        </Popup>
    )
}

export default memo(ActivityHistoryPopup); 