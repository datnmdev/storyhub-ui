import IconButton from "@components/IconButton";
import themeFeature from "@features/theme";
import notification from "@assets/icons/static/notifiction.png";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store.type";
function Notification() {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <IconButton
            icon={<img className="w-[3rem] h-[3rem] object-cover object-center" src={notification} />}
            width={48}
            height={40}
            borderRadius="50%"
            onClick={() => dispatch(themeFeature.themeActions.toggle())}
        />
    );
}

export default memo(Notification);
