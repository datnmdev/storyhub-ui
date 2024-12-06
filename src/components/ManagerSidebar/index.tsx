import { memo } from "react";
import Logo from "@assets/icons/logo.png";
import { Link, useLocation } from "react-router-dom";
import paths from "@routers/router.path";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

function ManagerSidebar() {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <div>
            <div className="h-[64px] flex items-center border-b-[1px] border-solid border-[var(--gray)]">
                <img
                    className="w-[120px]"
                    src={Logo}
                    alt="Logo"
                />
            </div>

            <div className="px-2 py-4">
                <ul className="mt-2">
                    <li>
                        <Link
                            className={classNames(
                                "relative px-4 rounded-[4px] leading-[38px] space-x-2 flex items-center",
                                location.pathname === "" ? " bg-[var(--primary)] text-[var(--white)]" : "hover:text-[var(--primary)]"
                            )}
                            to=""
                        >
                            <span className="text-[1.2rem]">
                                <i className="fa-solid fa-money-bill-transfer"></i>
                            </span>
                            <span>{t("manager.sidebar.withdrawRequestPage")}</span>
                            <span className="absolute top-1/2 right-2.5 -translate-y-1/2 bg-red-500 leading-none text-[0.9rem] px-2 py-1 rounded-[4px] text-[var(--white)]">999+</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={classNames(
                                "relative px-4 rounded-[4px] leading-[38px] space-x-2 flex items-center",
                                location.pathname === paths.managerEmployeeManagementPage() ? " bg-[var(--primary)] text-[var(--white)]" : "hover:text-[var(--primary)]"
                            )}
                            to={paths.managerEmployeeManagementPage()}
                        >
                            <span className="text-[1.2rem]">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <span>{t("manager.sidebar.employeeManagementPage")}</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={classNames(
                                "relative px-4 rounded-[4px] leading-[38px] space-x-2 flex items-center",
                                location.pathname ==="" ? " bg-[var(--primary)] text-[var(--white)]" : "hover:text-[var(--primary)]"
                            )}
                            to=""
                        >
                            <span className="text-[1.2rem]">
                                <i className="fa-solid fa-flag"></i>
                            </span>
                            <span>{t("manager.sidebar.genreManagement")}</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={classNames(
                                "relative px-4 rounded-[4px] leading-[38px] space-x-2 flex items-center",
                                location.pathname ==="" ? " bg-[var(--primary)] text-[var(--white)]" : "hover:text-[var(--primary)]"
                            )}
                            to=""
                        >
                            <span className="text-[1.2rem]">
                                <i className="fa-solid fa-chart-simple"></i>
                            </span>
                            <span>{t("manager.sidebar.revenueStatistics")}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default memo(ManagerSidebar);