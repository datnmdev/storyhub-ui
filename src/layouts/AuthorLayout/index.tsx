import ReaderFooter from "@components/ReaderFooter";
import AuthorHeader from "@components/AuthorHeader";
import { PropsWithChildren } from "react";
function AuthorLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-[100vh] flex flex-col justify-between ">
            <AuthorHeader />

            <div className="grow px-20">{children}</div>

            <ReaderFooter />
        </div>
    );
}

export default AuthorLayout;
