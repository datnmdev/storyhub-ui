import { Chapter } from "@apis/chapter";
import apis from "@apis/index";
import Pagination from "@components/Pagination";
import authFeature from "@features/auth";
import useFetch from "@hooks/fetch.hook";
import useFetchAll, { ApiFuncArray } from "@hooks/fetchAll.hook";
import { useAppSelector } from "@hooks/redux.hook";
import NumberUtils from "@utilities/number.util";
import classNames from "classnames";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import PaymentRemindPopup from "./components/PaymentRemindPopup";
import paths from "@routers/router.path";
import Protected from "@components/Protected";
import { Role } from "@constants/auth.constants";

function ChaperSection() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isAuthentication = useAppSelector(authFeature.authSelector.selectAuthenticated);
    const { storyId } = useParams();
    const [isRender, setRender] = useState<boolean>(false);
    const { data: currentPrice, isLoading: isGettingCurrentPrice, setRefetch: setReGetCurrentPrice } = useFetch(apis.priceApi.getCurrentPrice, {
        queries: {
            storyId
        }
    })
    const [queries, setQueries] = useState({
        page: 1,
        limit: 20,
        storyId,
        orderBy: JSON.stringify([
            ["order", "DESC"],
            ["updated_at", "DESC"],
            ["id", "DESC"]
        ])
    });
    const { data: chaptersData, isLoading: isGettingChapters, setRefetch: setReGetChapters } = useFetch<[Chapter[], number]>(apis.chapterApi.getChapterWithFilter, {
        queries
    }, false)
    const [paymentStatusList, setPaymentStatusList] = useState<boolean[] | null>(null);
    const [checkPaymentStatusOfChaptersApis, setCheckPaymentStatusOfChaptersApis] = useState<ApiFuncArray | null>(null);
    const { data: paymentStatusOfChaptersData, isLoading: isCheckingPaymentStatusOfChapters, setRefetch: setReCheckPaymentStatusOfChapters } = useFetchAll(checkPaymentStatusOfChaptersApis as ApiFuncArray, false);
    const [viewCountApis, setViewCountApi] = useState<ApiFuncArray | null>(null);
    const { data: viewCountsData, isLoading: isGettingViewCounts, setRefetch: setReGetViewCounts } = useFetchAll(viewCountApis as ApiFuncArray, false);
    const [selectedChapter, setSelectChapter] = useState<{ isPaid: boolean, chapter: Chapter } | null>(null);
    const [isProtected, setProtected] = useState<boolean>(false);

    useEffect(() => {
        if (!isGettingCurrentPrice) {
            if (currentPrice !== null) {
                setReGetChapters({
                    value: true
                })
            }
        }
    }, [isGettingCurrentPrice])

    useEffect(() => {
        if (!isGettingChapters) {
            if (chaptersData) {
                if (currentPrice > 0) {
                    if (isAuthentication) {
                        setCheckPaymentStatusOfChaptersApis(chaptersData[0].map(chapter => {
                            return [
                                apis.invoiceApi.getInvoice,
                                {
                                    queries: {
                                        chapterId: chapter.id,
                                        page: 1,
                                        limit: 1
                                    }
                                }
                            ]
                        }))

                    } else {
                        setPaymentStatusList(chaptersData[0].map(() => false));
                    }
                } else {
                    setPaymentStatusList(chaptersData[0].map(() => true));
                }
                setViewCountApi(chaptersData[0].map(chapter => {
                    return [
                        apis.viewApi.getViewCountOfChapter,
                        {
                            params: {
                                chapterId: chapter.id
                            }
                        }
                    ]
                }))
            }
        }
    }, [isGettingChapters])

    useEffect(() => {
        if (checkPaymentStatusOfChaptersApis) {
            setReCheckPaymentStatusOfChapters({
                value: true
            })
        }
    }, [checkPaymentStatusOfChaptersApis])

    useEffect(() => {
        if (!isCheckingPaymentStatusOfChapters) {
            if (paymentStatusOfChaptersData) {
                setPaymentStatusList(paymentStatusOfChaptersData.map(data => data[1] === 0 ? false : true))
            }
        }
    }, [isCheckingPaymentStatusOfChapters])

    useEffect(() => {
        if (paymentStatusList) {
            setReGetViewCounts({
                value: true
            })
        }
    }, [paymentStatusList])


    useEffect(() => {
        if (!isGettingViewCounts) {
            if (viewCountsData) {
                setRender(true);
            }
        }
    }, [isGettingViewCounts])

    useEffect(() => {
        setReGetCurrentPrice({
            value: true
        })
    }, [queries])

    useEffect(() => {
        if (selectedChapter) {
            if (selectedChapter.isPaid) {
                navigate(paths.readerChapterContentPage(selectedChapter.chapter.storyId, selectedChapter.chapter.id));
            }
        }
    }, [selectedChapter])

    if (!isRender) {
        return false;
    }

    return (
        <div>
            <div className="flex items-center text-[var(--primary)] font-[450] space-x-2">
                <span className="text-[1.8rem]">
                    <i className="fa-solid fa-database"></i>
                </span>

                <span className="text-[1.2rem]">
                    {t("reader.storyInfoPage.chapterListSection.title")}
                </span>
            </div>

            <div className="mt-2">
                <div className="w-full p-2 border-[2px] border-solid border-[var(--gray)]">
                    <div>
                        <div className="flex justify-between items-center border-b-[1px] border-solid border-[var(--gray)] pb-2 font-[450]">
                            <div className="w-1/4 line-clamp-1">{t("reader.storyInfoPage.chapterListSection.header.chapterName")}</div>
                            <div className="w-1/4 text-center line-clamp-1">{t("reader.storyInfoPage.chapterListSection.header.status.label")}</div>
                            <div className="w-1/4 text-center line-clamp-1">{t("reader.storyInfoPage.chapterListSection.header.updatedTime")}</div>
                            <div className="w-1/4 text-center line-clamp-1">{t("reader.storyInfoPage.chapterListSection.header.viewCount")}</div>
                        </div>
                    </div>

                    <div>
                        {chaptersData?.[0].map((chapter, index) => {
                            return (
                                <div
                                    key={chapter.id}
                                    className="flex justify-between items-center border-b-[1px] border-solid border-[var(--gray)] py-2 hover:text-[var(--primary)] hover:cursor-pointer gap-x-2"
                                    onClick={() => setSelectChapter({
                                        isPaid: Boolean(paymentStatusList?.[index]),
                                        chapter
                                    })}
                                >
                                    <div className="w-1/4 line-clamp-1">{chapter.name}</div>
                                    <div className="w-1/4 text-center line-clamp-1">
                                        <span
                                            className={classNames(
                                                "min-w-[98px] inline-block text-[var(--white)] px-2 py-1 rounded-[4px] text-[0.8rem]",
                                                paymentStatusList?.[index] ? "bg-green-500" : "bg-red-500"
                                            )}
                                        >
                                            {paymentStatusList?.[index] ? t("reader.storyInfoPage.chapterListSection.header.status.paid") : t("reader.storyInfoPage.chapterListSection.header.status.unpaid")}
                                        </span>
                                    </div>
                                    <div className="w-1/4 text-center line-clamp-1">{moment(chapter.updatedAt).format("DD/MM/YYYY HH:MM:SS")}</div>
                                    <div className="w-1/4 text-center line-clamp-1">{NumberUtils.formatNumberWithSeparator(String(viewCountsData?.[index]))}</div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex justify-center mt-4">
                        <Pagination
                            page={queries.page}
                            count={chaptersData?.[1] ? Math.ceil(chaptersData[1] / queries.limit) : 1}
                            onChange={(e, page) => setQueries({
                                ...queries,
                                page
                            })}
                        />
                    </div>
                </div>
            </div>

            {selectedChapter && !selectedChapter.isPaid
                && (
                    <Protected 
                        role={Role.READER}
                        enable={!isAuthentication}
                    >
                        <PaymentRemindPopup
                            chapter={selectedChapter.chapter}
                            price={currentPrice}
                            onClose={() => setSelectChapter(null)}
                        />
                    </Protected>
                )}
        </div>
    )
}

export default memo(ChaperSection);