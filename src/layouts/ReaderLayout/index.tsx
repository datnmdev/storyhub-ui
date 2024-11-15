import Footer from "@components/Footer";
import Header from "@components/Header";
import themeFeature from "@features/themes";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

function ReaderLayout({
    children
}: PropsWithChildren) {
    const themeValue = useSelector(themeFeature.themeSelector.selectValue);

    return (
        <div className={classNames(themeValue === "light" ? "light" : "dark", "min-h-[100vh] flex flex-col justify-between")}>
            <Header />

            <div className="grow">
                {children}
            </div>

            <Footer />
        </div>
    );
}

export default ReaderLayout;