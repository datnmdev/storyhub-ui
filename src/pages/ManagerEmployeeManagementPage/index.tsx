import { RequestInit } from "@apis/api.type";
import apis from "@apis/index";
import IconButton from "@components/IconButton";
import Pagination from "@components/Pagination";
import SearchInput from "@components/SearchInput";
import useFetch from "@hooks/fetch.hook";
import UrlUtils from "@utilities/url.util";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserDefaultAvatar from "@assets/avatars/user-default.png";
import { Gender } from "@constants/auth.constants";
import { useAppSelector } from "@hooks/redux.hook";
import themeFeature from "@features/theme";
import classNames from "classnames";
import { ModeratorStatus } from "@constants/moderator.constants";
import CreateEmployeePopup from "./components/CreateEmployeePopup";

function ManagerEmployeeManagementPage() {
    const { t } = useTranslation();
    const [isRender, setRender] = useState(false);
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);
    const [requestInit, setRequestInit] = useState<RequestInit>({
        queries: {
            page: 1,
            limit: 10
        }
    });
    const { data, isLoading, setRefetch } = useFetch(apis.moderatorApi.getModerators, requestInit);
    const [hiddenCreateEmployeePopup, setHiddenCreateEmployeePopup] = useState(true);

    useEffect(() => {
        if (requestInit) {
            setRefetch({
                value: true
            })
        }
    }, [requestInit])

    useEffect(() => {
        if (!isLoading) {
            if (data) {
                setRender(true);
            }
        }
    }, [isLoading])

    return (
        <div className="grow flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <IconButton
                        icon={(<i className="fa-solid fa-plus text-[1.2rem]"></i>)}
                        bgColor="var(--primary)"
                        padding="8px 24px"
                        color="var(--white)"
                        borderRadius="4px"
                        onClick={() => setHiddenCreateEmployeePopup(false)}
                    >
                        {t("manager.employeeManagementPage.btn.addEmployeeBtn")}
                    </IconButton>

                    {!hiddenCreateEmployeePopup
                        && (
                            <CreateEmployeePopup 
                                onClose={() => setHiddenCreateEmployeePopup(true)}
                            />
                        )}
                </div>

                <div className="flex items-center space-x-2">
                    <SearchInput
                        placeholder={t("manager.employeeManagementPage.searchInput.placeholder")}
                        onChange={e => setRequestInit({
                            queries: {
                                ...requestInit.queries,
                                keyword: e.target.value
                            }
                        })}
                    />

                    <IconButton
                        icon={(<i className="fa-solid fa-filter text-[1.2rem]"></i>)}
                        bgColor="var(--primary)"
                        padding="8px 24px"
                        color="var(--white)"
                        borderRadius="4px"
                    >
                        {t("manager.employeeManagementPage.btn.filterBtn")}
                    </IconButton>
                </div>
            </div>

            <div className="grow flex flex-col">
                {isRender && data[1] > 0
                    ? (
                        <div className="pt-6">
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
                                                                "w-20 h-28 object-contain mx-auto",
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
                                                        {moderator.gender === Gender.ORTHER && t("manager.employeeManagementPage.table.thead.gender.other")}
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
                                />
                            </div>
                        </div>
                    )
                    : (
                        <div className="grow flex justify-center items-center">
                            {t("manager.notData")}
                        </div>
                    )}
            </div>

        </div>
    )
}

export default memo(ManagerEmployeeManagementPage);