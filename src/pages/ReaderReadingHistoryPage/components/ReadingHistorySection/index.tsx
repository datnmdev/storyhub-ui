import { RequestInit } from "@apis/api.type";
import apis from "@apis/index";
import Button from "@components/Button";
import LoadingWrapper from "@components/LoadingWrapper";
import Pagination from "@components/Pagination";
import useFetch from "@hooks/fetch.hook";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReadingHistoryItem from "./components/ReadingHistoryItem";
import { useAppDispatch } from "@hooks/redux.hook";
import toastFeature from "@features/toast";
import { ToastType } from "@constants/toast.constants";
import NoData from "@components/NoData";

function ReadingHistorySection() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [getReadingHistoryRequest, setGetReadingHistoryRequest] = useState<RequestInit>({
        queries: {
            page: 1,
            limit: 10
        }
    });
    const { data, isLoading, setRefetch } = useFetch(apis.readingHistoryApi.getReadingHistoryWithFilter, getReadingHistoryRequest);
    const [deleteAllReadingHistoryRequest, setDeleteAllReadingHistoryRequest] = useState<RequestInit>();
    const { data: isDeleteAllReadingHistory, isLoading: isDeletingAllReadingHistory, error: deleteAllReadingHistoryError, setRefetch: setReDeleteAllReadingHistory } = useFetch(apis.readingHistoryApi.deleteAllReadingHistory, deleteAllReadingHistoryRequest, false);

    useEffect(() => {
        if (getReadingHistoryRequest) {
            setRefetch({
                value: true
            })
        }
    }, [getReadingHistoryRequest])

    useEffect(() => {
        if (deleteAllReadingHistoryRequest) {
            setReDeleteAllReadingHistory({
                value: true
            })
        }
    }, [deleteAllReadingHistoryRequest])

    useEffect(() => {
        if (!isDeletingAllReadingHistory) {
            if (isDeleteAllReadingHistory) {
                dispatch(toastFeature.toastAction.add({
                    type: ToastType.SUCCESS,
                    title: t("notification.deleteAllReadingHistorySuccess")
                }))
                setRefetch({
                    value: true
                })
            } else {
                if (deleteAllReadingHistoryError) {
                    dispatch(toastFeature.toastAction.add({
                        type: ToastType.ERROR,
                        title: t("notification.undefinedError")
                    }))
                }
            }
        }
    }, [isDeletingAllReadingHistory])

    return (
        <LoadingWrapper
            isLoading={isLoading}
            message={t("reader.readingHistoryPage.readingHistorySection.loading.message")}
            level="component"
        >
            <LoadingWrapper
                isLoading={isDeletingAllReadingHistory}
                message={t("reader.readingHistoryPage.readingHistorySection.loading.handlingReqMessage")}
            >
                {data
                    && (
                        <div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-[1.4rem] font-semibold">{t("reader.readingHistoryPage.readingHistorySection.title")}</h3>

                                <Button
                                    width={80}
                                    height={32}
                                    onClick={() => setDeleteAllReadingHistoryRequest({})}
                                >
                                    {t("reader.readingHistoryPage.readingHistorySection.btn.deleteAllBtn")}
                                </Button>
                            </div>

                            {data[1] > 0
                                ? (
                                    <div className="grow mt-6 space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            {data[0].map((story: any) => {
                                                return (
                                                    <ReadingHistoryItem
                                                        key={story.id}
                                                        data={story}
                                                        setReGetReadingHistory={setRefetch}
                                                    />
                                                )
                                            })}
                                        </div>

                                        <div className="flex justify-center items-start">
                                            <Pagination
                                                page={getReadingHistoryRequest.queries.page}
                                                count={Math.ceil(data[1] / getReadingHistoryRequest.queries.limit)}
                                                onChange={(e, page) => setGetReadingHistoryRequest({
                                                    queries: {
                                                        ...getReadingHistoryRequest.queries,
                                                        page
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>
                                )
                                : (
                                    <div className="min-h-[320px] flex items-center justify-center">
                                        <NoData />
                                    </div>
                                )}
                        </div>
                    )}
            </LoadingWrapper>
        </LoadingWrapper>
    )
}

export default memo(ReadingHistorySection);