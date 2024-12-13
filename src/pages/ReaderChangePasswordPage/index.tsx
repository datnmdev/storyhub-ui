import Breadcrumb from "@components/Breadcrumb";
import { BreadcrumbProps } from "@components/Breadcrumb/Breadcrumb.type";
import paths from "@routers/router.path";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAppSelector } from "@hooks/redux.hook";
import themeFeature from "@features/theme";
import LightKeyIcon from "@assets/icons/static/ligh-key.png";
import ChangePasswordForm from "./components/ChangePasswordForm";

function ReaderChangePasswordPage() {
    const { t } = useTranslation();
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);

    const breadcrumbItems: BreadcrumbProps["items"] = [
        {
            label: t("reader.changePasswordPage.breadcrumb.items.homePage"),
            path: paths.readerHomePage()
        },
        {
            label: t("reader.changePasswordPage.breadcrumb.items.readerPersonalProfilePage"),
            path: paths.readerChangePasswordPage()
        }
    ]

    return (
        <div className="grow desktop:w-[var(--desktop-container-w)] mx-auto py-8">
            <div>
                <Breadcrumb
                    items={breadcrumbItems}
                />
            </div>

            <div className="flex justify-between items-stretch mt-2 min-h-[520px] space-x-4">
                <div className="w-[280px]">
                    <h3 className="font-semibold text-[1.4rem]">{t("reader.changePasswordPage.sidebar.heading")}</h3>
                    <ul className="mt-2">
                        <li>
                            <Link
                                className="px-4 rounded-[4px] hover:text-[var(--primary)] leading-[38px] space-x-2 flex items-center"
                                to={paths.readerPersonalProfilePage()}
                            >
                                <span className="text-[1.2rem]">
                                    <i className="fa-regular fa-user"></i>
                                </span>
                                <span>{t("reader.changePasswordPage.sidebar.personalProfileManagement")}</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                className="pl-2 pr-4 rounded-[4px] leading-[38px] space-x-2 flex items-center bg-[var(--primary)] text-[var(--white)]"
                                to={paths.readerDepositeTransHistoryPage()}
                            >
                                <span>
                                    <img 
                                        className="w-6 h-6 object-cover object-center translate-x-0.5"
                                        src={LightKeyIcon} 
                                        alt="Key Icon" 
                                    />
                                </span>
                                <span>{t("reader.changePasswordPage.sidebar.changePassword")}</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={classNames("grow", themeValue === "light" ? "bg-[var(--light-gray)]" : "bg-[#242121]")}>
                    <ChangePasswordForm />
                </div>
            </div>
        </div>
    )
}

export default memo(ReaderChangePasswordPage);