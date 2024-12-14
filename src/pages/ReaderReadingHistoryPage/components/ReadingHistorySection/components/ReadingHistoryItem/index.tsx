import { memo, useEffect, useState } from "react";
import { ReadingHistoryItemProps } from "./ReadingHistoryItem.type";
import UrlUtils from "@utilities/url.util";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import paths from "@routers/router.path";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import themeFeature from "@features/theme";
import Button from "@components/Button";
import IconButton from "@components/IconButton";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { RequestInit } from "@apis/api.type";
import LoadingWrapper from "@components/LoadingWrapper";
import toastFeature from "@features/toast";
import { ToastType } from "@constants/toast.constants";
import ReviewDetailReadingHistoryPopup from "./components/ReviewDetailReadingHistoryPopup";

function ReadingHistoryItem({
    data,
    setReGetReadingHistory
}: ReadingHistoryItemProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);
    const [deleteReadingHistoryByStoryIdRequest, setDeleteReadingHistoryByStoryIdRequest] = useState<RequestInit>();
    const { data: isDeletedReadingHistoryByStoryId, isLoading: isDeletingReadingHistoryByStoryId, error: deleteReadingHistoryByStoryIdError, setRefetch: setReDeleteReadingHistoryByStoryId } = useFetch(apis.readingHistoryApi.deleteReadingHistoryByStoryId, deleteReadingHistoryByStoryIdRequest, false);
    const [hiddenReviewDetailReadingHistory, setHiddenReviewDetailReadingHistory] = useState(true);

    useEffect(() => {
        if (deleteReadingHistoryByStoryIdRequest) {
            setReDeleteReadingHistoryByStoryId({
                value: true
            })
        }
    }, [deleteReadingHistoryByStoryIdRequest])

    useEffect(() => {
        if (!isDeletingReadingHistoryByStoryId) {
            if (isDeletedReadingHistoryByStoryId) {
                dispatch(toastFeature.toastAction.add({
                    type: ToastType.SUCCESS,
                    title: t("notification.deleteReadingHistoryByStoryIdSuccess")
                }))
                setReGetReadingHistory({
                    value: true
                })
            } else {
                if (deleteReadingHistoryByStoryIdError) {
                    dispatch(toastFeature.toastAction.add({
                        type: ToastType.ERROR,
                        title: t("notification.undefinedError")
                    }))
                }
            }
        }
    }, [isDeletingReadingHistoryByStoryId])

    return (
        <LoadingWrapper
            isLoading={isDeletingReadingHistoryByStoryId}
            message={t("reader.readingHistoryPage.readingHistorySection.loading.handlingReqMessage")}
        >
            <div
                className={classNames(
                    "flex justify-between p-3 space-x-3 rounded-[4px]",
                    themeValue === "light" ? "light__boxShadow" : "dark__boxShadow"
                )}
            >
                <div className="self-stretch shrink-0">
                    <img
                        className="w-[72px] h-[100px] object-cover object-center rounded-[4px]"
                        src={UrlUtils.generateUrl(data.coverImage)}
                        alt={data.title}
                    />
                </div>

                <div className="grow flex justify-between space-x-3">
                    <div className="grow flex flex-col justify-between">
                        <h3 className="line-clamp-1 font-[450] text-[1.2rem]">
                            {data.title}
                        </h3>

                        <div className="mt-0.5">
                            {t("reader.readingHistoryPage.readingHistorySection.item.mostRecentlyReadingTimeAt", { value: moment(data.histories[0].createdAt).format("HH:mm:ss DD/MM/YYYY") })}
                        </div>

                        <div className="space-x-1 mt-0.5">
                            <span>
                                {t("reader.readingHistoryPage.readingHistorySection.item.mostRecentlyReadedChapter")}
                            </span>

                            <Link
                                className="font-semibold text-[var(--primary)] hover:opacity-60"
                                to={paths.readerChapterContentPage(data.id, data.histories[0].chapterId)}
                                state={data.histories[0]}
                            >
                                {data.histories[0].chapter.name}
                            </Link>
                        </div>

                        <div className="mt-1.5 flex items-center space-x-2">
                            <Button
                                width={100}
                                height={32}
                                bgColor="#48b528"
                                onClick={() => navigate(paths.readerChapterContentPage(data.id, data.histories[0].chapterId), {
                                    state: data.histories[0]
                                })}
                            >
                                {t("reader.readingHistoryPage.readingHistorySection.btn.continueReadingBtn")}
                            </Button>

                            <Button
                                width={100}
                                height={32}
                                bgColor="var(--primary)"
                                onClick={() => setHiddenReviewDetailReadingHistory(false)}
                            >
                                {t("reader.readingHistoryPage.readingHistorySection.btn.reviewDetailBtn")}
                            </Button>
                        </div>
                    </div>

                    <div className="shrink-0 flex items-center justify-center">
                        <IconButton
                            icon={(
                                <i className="fa-solid fa-trash text-red-500 text-[1.6rem] px-4"></i>
                            )}
                            onClick={() => setDeleteReadingHistoryByStoryIdRequest({
                                queries: {
                                    storyId: data.id
                                }
                            })}
                        />
                    </div>
                </div>
            </div>

            {!hiddenReviewDetailReadingHistory
                && (
                    <ReviewDetailReadingHistoryPopup
                        data={data}
                        onClose={() => setHiddenReviewDetailReadingHistory(true)}
                        setReGetReadingHistory={setReGetReadingHistory}
                    />
                )}
        </LoadingWrapper>
    )
}

export default memo(ReadingHistoryItem);