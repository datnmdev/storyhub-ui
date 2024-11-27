import { memo } from "react";
import { PopupProps } from "./Popup.type";
import { useAppSelector } from "@hooks/redux.hook";
import themeFeature from "@features/theme";
import classNames from "classnames";

function Popup({
    title = "Cửa sổ popup",
    width = 420,
    minHeight = 48,
    children,
    onClose
}: PopupProps) {
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);

    return (
        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center">
            <div className={classNames("absolute top-0 left-0 w-full h-full opacity-60", themeValue === "light" ? "light" : "dark")}></div>
            <div
                className={classNames(
                    "rounded-[8px] z-[1] p-4 animate-fadeIn",
                    themeValue === "light" ? "light light__boxShadow" : "dark dark__boxShadow"
                )}
                style={{
                    width,
                    minHeight 
                }}
            >
                <div className="flex justify-between items-center">
                    <div className="text-[1.2rem] font-[450] select-none">
                        {title}
                    </div>

                    <div
                        className="text-[1.6rem] hover:opacity-60 cursor-pointer"
                        onClick={onClose}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>

                <div className="grow mt-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default memo(Popup);