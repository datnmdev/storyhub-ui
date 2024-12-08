import { RequestInit } from "@apis/api.type";
import apis from "@apis/index";
import IconButton from "@components/IconButton";
import SearchInput from "@components/SearchInput";
import useFetch from "@hooks/fetch.hook";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CreateEmployeePopup from "./components/CreateEmployeePopup";
import LoadingWrapper from "@components/LoadingWrapper";
import EmployeeList from "./components/EmployeeList";
import EmployeeFilter from "./components/EmployeeFilter";

function ManagerEmployeeManagementPage() {
    const { t } = useTranslation();
    const [isRender, setRender] = useState(false);
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
            setRender(() => false);
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
                                setReGetEmployeeList={setRefetch}
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

                    <EmployeeFilter
                        onChange={data => setRequestInit({
                            queries: {
                                ...requestInit.queries,
                                gender: data.gender.length > 0 ? JSON.stringify(data.gender) : undefined,
                                statuses: data.status.length > 0 ? JSON.stringify(data.status) : undefined
                            }
                        })}
                    />
                </div>
            </div>

            <div className="grow flex flex-col">
                <LoadingWrapper
                    isLoading={!isRender}
                    level="component"
                    message={t("manager.employeeManagementPage.loading.message")}
                >
                    <EmployeeList
                        data={data}
                        requestInit={requestInit}
                        setRequestInit={setRequestInit}
                        setReGetEmployeeList={setRefetch}
                    />
                </LoadingWrapper>
            </div>
        </div>
    )
}

export default memo(ManagerEmployeeManagementPage);