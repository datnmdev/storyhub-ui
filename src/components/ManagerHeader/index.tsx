import { memo } from "react"
import ToggleThemeButton from "./components/ToggleThemeButton";
import ChangeLangButton from "./components/ChangeLangButton";
import User from "./components/User";

function ManagerHeader() {
    return (
        <div className="h-[64px] flex items-center justify-end border-b-[1px] border-solid border-[var(--gray)]">
            <div className="flex items-center px-8">
                <ToggleThemeButton />
                <ChangeLangButton />
                <div className="ml-2">
                    <User />
                </div>
            </div>
        </div>
    )
}

export default memo(ManagerHeader);