import { memo, useState } from "react";
import { EmployeeListProps } from "./EmployeeList.type";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { useAppSelector } from "@hooks/redux.hook";
import themeFeature from "@features/theme";
import UserDefaultAvatar from "@assets/avatars/user-default.png";
import { ModeratorStatus } from "@constants/moderator.constants";
import { Gender } from "@constants/auth.constants";
import UrlUtils from "@utilities/url.util";
import Pagination from "@components/Pagination";
import IconButton from "@components/IconButton";
import NoData from "../../../../components/NoData";
import UpdateEmployeePopup from "../UpdateEmployeePopup";

function EmployeeList({
    data,
    requestInit,
    setRequestInit,
    setReGetEmployeeList
}: EmployeeListProps) {
    const { t } = useTranslation();
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);
    const [selectedUpdatingEmployee, setSelectedUpdatingEmployee] = useState();

    if (!data || data[1] <= 0) {
        return (
            <NoData />
        )
    }

    return (
        <div className="pt-6">
            <div>
                <div className="grow overflow-auto">
                    <table className="w-full">
                        <thead className="bg-[var(--primary)] text-[var(--white)]">
                            <tr>
                                <th className="py-2">{t("manager.employeeManagementPage.table.thead.employeeId")}</th>
                                <th className="py-2">{t("manager.employeeManagementPage.table.thead.avatar")}</th>
                                <th className="py-2">{t("manager.employeeManagementPage.table.thead.cccd")}</th>
                                <th className="py-2">{t("manager.employeeManagementPage.table.thead.name")}</th>
                                <th className="py-2">{t("manager.employeeManagementPage.table.thead.gender.title")}</th>
                                <th className="py-2">{t("manager.employeeManagementPage.table.thead.status.title")}</th>
                                <th className="py-2">{t("manager.employeeManagementPage.table.thead.action")}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data?.[0].map((moderator: any) => {
                                return (
                                    <tr
                                        key={moderator.id}
                                        className="h-full text-center border-b-[1px] border-solid border-[var(--gray)]"
                                    >
                                        <td className="py-2 align-middle">
                                            {moderator.id}
                                        </td>

                                        <td className="py-2">
                                            <img
                                                className={classNames(
                                                    "w-20 h-[72px] object-cover object-center mx-auto",
                                                    themeValue === "light" ? "light__boxShadow" : "dark__boxShadow"
                                                )}
                                                src={moderator.avatar === null ? UserDefaultAvatar : UrlUtils.generateUrl(moderator.avatar)}
                                                alt="Avatar"
                                            />
                                        </td>

                                        <td className="py-2 align-middle">
                                            {moderator.cccd}
                                        </td>

                                        <td className="py-2 align-middle">
                                            {moderator.name}
                                        </td>

                                        <td className="py-2 align-middle">
                                            {moderator.gender === Gender.MALE && t("manager.employeeManagementPage.table.thead.gender.male")}
                                            {moderator.gender === Gender.FEMALE && t("manager.employeeManagementPage.table.thead.gender.female")}
                                            {moderator.gender === Gender.ORTHER && t("manager.employeeManagementPage.table.thead.gender.orther")}
                                            {moderator.gender === null && t("manager.employeeManagementPage.table.thead.gender.notUpdated")}
                                        </td>

                                        <td
                                            className={classNames(
                                                "py-2 align-middle",
                                                moderator.status === ModeratorStatus.WORKING ? "text-green-500" : "text-red-500"
                                            )}
                                        >
                                            {moderator.status === ModeratorStatus.WORKING && t("manager.employeeManagementPage.table.thead.status.working")}
                                            {moderator.status === ModeratorStatus.RESIGNED && t("manager.employeeManagementPage.table.thead.status.resigned")}
                                        </td>

                                        <td className="py-2 align-middle">
                                            <div className="flex justify-center item space-x-2">
                                                <IconButton
                                                    icon={(<i className="fa-regular fa-eye text-green-500"></i>)}
                                                    borderRadius="50%"
                                                    fontSize="1.4rem"
                                                />

                                                <IconButton
                                                    icon={(<i className="fa-solid fa-pen text-[#0393ec]"></i>)}
                                                    color=""
                                                    borderRadius="50%"
                                                    fontSize="1.4rem"
                                                    onClick={() => setSelectedUpdatingEmployee(moderator)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center items-center mt-4">
                    <Pagination
                        count={Math.ceil(data?.[1] / requestInit.queries.limit)}
                        page={requestInit.queries.page}
                        onChange={(e, page) => setRequestInit({
                            queries: {
                                ...requestInit.queries,
                                page
                            }
                        })}
                    />
                </div>
            </div>

            <div>
                {selectedUpdatingEmployee
                    && (
                        <UpdateEmployeePopup
                            employee={selectedUpdatingEmployee}
                            onClose={() => setSelectedUpdatingEmployee(undefined)}
                            setReGetEmployeeList={setReGetEmployeeList}
                        />
                    )}
            </div>
        </div>
    )
}

export default memo(EmployeeList);