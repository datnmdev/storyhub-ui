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
        <div className={classNames(themeValue === "light" ? "light" : "dark", "min-h-[100vh] flex justify-between items-stretch transition-colors duration-1000 ease-in-out")}>
            <div className="min-w-[360px] border-r-[1px] border-solid border-[var(--gray)]">
                <ManagerSidebar />
            </div>

            <div className="grow flex flex-col">
                <div>
                    <ManagerHeader />
                </div>

                <div className="grow px-8 my-6 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default memo(ManagerLayout);