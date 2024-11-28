import Nav from "./components/Nav";
import Logo from "./components/Logo";
import classNames from "classnames";
import Notification from "./components/Notification";
import Setting from "./components/Setting";

const Header = () => {
    return (
        <div className="border-solid border-b-[1px] border-[var(--gray)] mb-5">
            <div
                className={classNames(
                    "desktop:w-[var(--desktop-container-w)] mx-auto flex justify-between leading-[64px]"
                )}
            >
                <div className="flex">
                    <Logo />
                    <Nav />
                </div>
                <div className="flex items-center justify-center">
                    <Notification />
                    <Setting />
                </div>
            </div>
        </div>
    );
};

export default Header;
