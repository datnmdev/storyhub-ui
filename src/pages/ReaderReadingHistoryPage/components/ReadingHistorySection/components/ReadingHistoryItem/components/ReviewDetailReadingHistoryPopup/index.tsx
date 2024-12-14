import Popup from "@components/Popup";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReviewDetailReadingHistoryPopupProps } from "./ReviewDetailReadingHistoryPopup.type";
import Button from "@components/Button";
import paths from "@routers/router.path";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IconButton from "@components/IconButton";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import themeFeature from "@features/theme";
import { RequestInit } from "@apis/api.type";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import toastFeature from "@features/toast";
import { ToastType } from "@constants/toast.constants";

function ReviewDetailReadingHistoryPopup({
    data,
    onClose,
    setReGetReadingHistory
}: ReviewDetailReadingHistoryPopupProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);
    const [deleteReadingHistoryByChapterIdReq, setDeleteReadingHistoryByChapterIdReq] = useState<RequestInit>();
    const { data: isDeletedReadingHistoryByChapterId, isLoading: isDeletingReadingHistoryByChapterId, error: deleteReadingHistoryByChapterIdError, setRefetch: setReDeleteReadingHistoryByChapterId } = useFetch(apis.readingHistoryApi.deleteReadingHistoryByChapterId, deleteReadingHistoryByChapterIdReq, false);

    useEffect(() => {
        if (deleteReadingHistoryByChapterIdReq) {
            setReDeleteReadingHistoryByChapterId({
                value: true
            })
        }
    }, [deleteReadingHistoryByChapterIdReq])

    useEffect(() => {
        if (!isDeletingReadingHistoryByChapterId) {
            if (isDeletedReadingHistoryByChapterId) {
                dispatch(toastFeature.toastAction.add({
                    type: ToastType.SUCCESS,
                    title: t("notification.deleteReadingHistoryByChapterIdSuccess")
                }))
                setReGetReadingHistory({
                    value: true
                })
            } else {
                if (deleteReadingHistoryByChapterIdError) {
                    dispatch(toastFeature.toastAction.add({
                        type: ToastType.ERROR,
                        title: t("notification.undefinedError")
                    }))
                }
            }
        }
    }, [isDeletingReadingHistoryByChapterId])

    return (
        <Popup
            title={t("reader.readingHistoryPage.readingHistorySection.reviewDetailReadingHistoryPopup.title")}
            maxHeight={420}
            onClose={onClose}
        >
            {data.histories.map((history: any) => {
                return (
                    <div
                        key={history.id}
                        className={classNames(
                            "flex justify-between items-center rounded-[4px] p-4 m-2",
                            themeValue === "light" ? "light__boxShadow" : "dark__boxShadow"
                        )}
                    >
                        <div className="grow">
                            <div>
                                <h3 className="font-[450] text-[1.05rem] line-clamp-1">
                                    {history.chapter.name}
                                </h3>

                                <div className="mt-0.5 text-[0.9rem] italic text-[var(--dark-gray)] font-[450]">
                                    {t("reader.readingHistoryPage.readingHistorySection.reviewDetailReadingHistoryPopup.firstReadingTimeAt", { value: moment(history.createdAt).format("HH:mm:ss DD/MM/YYYY") })}
                                </div>

                                <div className="mt-0.5 text-[0.9rem] italic text-[var(--dark-gray)] font-[450]">
                                    {t("reader.readingHistoryPage.readingHistorySection.reviewDetailReadingHistoryPopup.mostRecentlyReadingTimeAt", { value: moment(history.updatedAt).format("HH:mm:ss DD/MM/YYYY") })}
                                </div>
                            </div>

                            <div className="mt-0.5 text-[0.92rem]">
                                <Button
                                    width={64}
                                    height={28}
                                    bgColor="#48b528"
                                    onClick={() => navigate(paths.readerChapterContentPage(data.id, history.chapterId), {
                                        state: history
                                    })}
                                >
                                    {t("reader.readingHistoryPage.readingHistorySection.btn.continueReadingBtn")}
                                </Button>
                            </div>
                        </div>

                        <div className="shrink-0 flex items-center justify-center">
                            <IconButton
                                icon={(
                                    <i className="fa-solid fa-trash text-red-500 text-[1.6rem] px-4"></i>
                                )}
                                onClick={() => setDeleteReadingHistoryByChapterIdReq({
                                    queries: {
                                        chapterId: history.chapterId
                                    }
                                })}
                            />
                        </div>
                    </div>
                )
            })}
        </Popup>
    )
}

export default memo(ReviewDetailReadingHistoryPopup);