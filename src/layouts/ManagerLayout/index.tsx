import ManagerHeader from "@components/ManagerHeader";
import ManagerSidebar from "@components/ManagerSidebar";
import themeFeature from "@features/theme";
import { useAppSelector } from "@hooks/redux.hook";
import classNames from "classnames";
import { memo, PropsWithChildren } from "react";

function ManagerLayout({
    children
}: PropsWithChildren) {
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);

    return (
        <div className={classNames(themeValue === "light" ? "light" : "dark", "h-[100vh] flex justify-between transition-colors duration-1000 ease-in-out")}>
            <div className="min-w-[360px] border-r-[1px] border-solid border-[var(--gray)] shrink-0">
                <ManagerSidebar />
            </div>

            <div className="grow flex flex-col overflow-hidden">
                <div>
                    <ManagerHeader />
                </div>

                <div className="grow px-8 my-6 flex flex-col overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default memo(ManagerLayout);