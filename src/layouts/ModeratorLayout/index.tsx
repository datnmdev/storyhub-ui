import ReaderFooter from "@components/ReaderFooter";
import ModeratorHeader from "@components/ModeratorHeader";
import { PropsWithChildren } from "react";
function ModeratorLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-[100vh] flex flex-col justify-between ">
            <ModeratorHeader />

            <div className="grow px-20">{children}</div>

            <ReaderFooter />
        </div>
    );
}

export default ModeratorLayout;
