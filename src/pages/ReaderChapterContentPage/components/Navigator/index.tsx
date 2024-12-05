import { Chapter } from "@apis/chapter";
import apis from "@apis/index";
import Button from "@components/Button";
import MenuItem from "@components/MenuItem";
import Select from "@components/Select";
import authFeature from "@features/auth";
import useFetch from "@hooks/fetch.hook";
import useFetchAll, { ApiFuncArray } from "@hooks/fetchAll.hook";
import { useAppSelector } from "@hooks/redux.hook";
import PaymentRemindPopup from "@pages/ReaderStoryInfoPage/components/ChapterSection/components/PaymentRemindPopup";
import paths from "@routers/router.path";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

function Navigator() {
    const { storyId, chapterId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { data: chaptersData, isLoading: isGettingChapters, setRefetch: setReGetChapters } = useFetch<[Chapter[], number]>(apis.chapterApi.getChapterWithFilter, {
        queries: {
            page: 1,
            limit: Number.MAX_SAFE_INTEGER,
            storyId,
            orderBy: JSON.stringify([
                ["order", "DESC"]
            ])
        }
    }, false)
    const isAuthentication = useAppSelector(authFeature.authSelector.selectAuthenticated);
    const [isRender, setRender] = useState<boolean>(false);
    const { data: currentPrice, isLoading: isGettingCurrentPrice } = useFetch(apis.priceApi.getCurrentPrice, {
        queries: {
            storyId
        }
    })
    const [paymentStatusList, setPaymentStatusList] = useState<boolean[] | null>(null);
    const [checkPaymentStatusOfChaptersApis, setCheckPaymentStatusOfChaptersApis] = useState<ApiFuncArray | null>(null);
    const { data: paymentStatusOfChaptersData, isLoading: isCheckingPaymentStatusOfChapters, setRefetch: setReCheckPaymentStatusOfChapters } = useFetchAll(checkPaymentStatusOfChaptersApis as ApiFuncArray, false);
    const [seletedChapter, setSeletedChapter] = useState<{ isPaid: boolean, chapter: Chapter } | null>(null);
    const [navigator, setNavigator] = useState<{ previousIndex: number, nextIndex: number}>({
        previousIndex: -1,
        nextIndex: -1
    });

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
                const currentChapterIndex = chaptersData[0].findIndex(chapter => chapter.id === Number(chapterId));
                setNavigator({
                    previousIndex: currentChapterIndex + 1,
                    nextIndex: currentChapterIndex - 1
                })
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
            setRender(true);
        }
    }, [paymentStatusList])

    useEffect(() => {
        if (seletedChapter && seletedChapter.isPaid) {
            navigate(paths.readerChapterContentPage(seletedChapter.chapter.storyId, seletedChapter.chapter.id));
            window.location.reload();
        }
    }, [seletedChapter])

    if (!isRender) {
        return null;
    }

    return (
        <div>
            <div className="flex justify-center space-x-2">
                <div>
                    <Button
                        disabled={chaptersData?.[0] ? navigator.previousIndex > chaptersData[0].length - 1 : true}
                        width={120}
                        onClick={() => setSeletedChapter({
                            isPaid: paymentStatusList?.[navigator.previousIndex] as boolean,
                            chapter: chaptersData?.[0][navigator.previousIndex] as Chapter
                        })}
                    >
                        <div className="space-x-2 flex items-center">
                            <span className="text-[1.4rem]">
                                <i className="fa-solid fa-angle-left"></i>
                            </span>

                            <span>
                                {t("reader.chapterContentPage.btn.chapterPrevious")}
                            </span>
                        </div>
                    </Button>
                </div>

                <div className="max-w-[160px]">
                    <Select value={chapterId}>
                        {chaptersData?.[0].map((chapter, index) => {
                            return (
                                <MenuItem
                                    key={chapter.id}
                                    value={chapter.id}
                                    onClick={() => {
                                        setSeletedChapter({
                                            isPaid: paymentStatusList?.[index] as boolean,
                                            chapter
                                        })
                                        setNavigator({
                                            previousIndex: index + 1,
                                            nextIndex: index - 1
                                        })
                                    }}
                                >
                                    <div className="w-full flex justify-between items-center space-x-4">
                                        <div className="line-clamp-1">
                                            {chapter.name}
                                        </div>

                                        {paymentStatusList?.[index]
                                            ? (
                                                <div>
                                                    <i className="fa-solid fa-lock-open"></i>
                                                </div>
                                            )
                                            : (
                                                <div>
                                                    <i className="fa-solid fa-lock"></i>
                                                </div>
                                            )}
                                    </div>
                                </MenuItem>
                            )
                        })}
                    </Select>
                </div>

                <div>
                    <Button
                        width={120}
                        disabled={navigator.nextIndex < 0}
                        onClick={() => setSeletedChapter({
                            isPaid: paymentStatusList?.[navigator.nextIndex] as boolean,
                            chapter: chaptersData?.[0][navigator.nextIndex] as Chapter
                        })}
                    >
                        <div className="space-x-2 flex items-center">
                            <span>
                                {t("reader.chapterContentPage.btn.chapterNext")}
                            </span>

                            <span className="text-[1.4rem]">
                                <i className="fa-solid fa-angle-right"></i>
                            </span>
                        </div>
                    </Button>
                </div>
            </div>

            {seletedChapter && !seletedChapter.isPaid
                && (
                    <PaymentRemindPopup
                        chapter={seletedChapter.chapter}
                        price={currentPrice}
                        onClose={() => setSeletedChapter(null)}
                    />
                )}
        </div>
    )
}

export default memo(Navigator);